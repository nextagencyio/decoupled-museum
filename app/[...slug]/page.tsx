import Header from '../components/Header'
import ErrorBoundary from '../components/ErrorBoundary'
import HomepageRenderer from '../components/HomepageRenderer'
import ResponsiveImage from '../components/ResponsiveImage'
import { headers } from 'next/headers'
import { Metadata } from 'next'
import { GET_NODE_BY_PATH } from '@/lib/queries'
import { getServerApolloClient } from '@/lib/apollo-client'

export const revalidate = 300
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params
  const path = `/${(resolvedParams.slug || []).join('/')}`
  try {
    const apollo = getServerApolloClient(await headers())
    const { data } = await apollo.query({ query: GET_NODE_BY_PATH, variables: { path } })
    const title = data?.route?.entity?.title || 'Page'
    return { title }
  } catch {
    return { title: 'Page' }
  }
}

function PageNotFound({ path }: { path: string }) {
  return (
    <div className="py-16 text-center">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-12">
        <h1 className="mb-4 text-2xl font-semibold text-white">Page Not Found</h1>
        <p className="mb-2 text-slate-300">We couldn&#39;t find any content at this path.</p>
        <p className="text-sm text-slate-500">Path: {path}</p>
      </div>
    </div>
  )
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const path = `/${(resolvedParams.slug || []).join('/')}`
  const apollo = getServerApolloClient(await headers())

  try {
    const { data } = await apollo.query({ query: GET_NODE_BY_PATH, variables: { path }, fetchPolicy: 'no-cache' })
    const entity = data?.route?.entity

    if (!entity) {
      return (
        <div className="min-h-screen bg-slate-950 text-white">
          <Header />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <PageNotFound path={path} />
          </main>
        </div>
      )
    }

    if (entity.__typename === 'NodeHomepage') {
      return <HomepageRenderer homepageContent={entity} />
    }

    const title = entity.title || 'Untitled'
    const bodyHtml = entity?.body?.processed || ''
    const image = entity?.image

    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <ErrorBoundary>
            <article className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/20">
              {image && (
                <ResponsiveImage
                  image={image}
                  alt={image.alt || title}
                  className="rounded-t-[2rem]"
                  priority={true}
                />
              )}
              <div className="p-6 md:p-10">
                <div className="mb-6 h-px w-20 bg-gradient-to-r from-accent-400 to-transparent" />
                <h1 className="mb-4 font-display text-2xl font-semibold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">{title}</h1>
                <div
                  className="prose prose-sm prose-invert prose-slate max-w-none sm:prose lg:prose-lg prose-headings:font-display prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-a:text-accent-300"
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />
              </div>
            </article>
          </ErrorBoundary>
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error loading page by path:', error)
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PageNotFound path={path} />
        </main>
      </div>
    )
  }
}
