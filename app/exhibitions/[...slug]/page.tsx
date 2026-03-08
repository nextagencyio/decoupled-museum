import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_EXHIBITION_BY_PATH } from '@/lib/queries'
import { DrupalExhibition } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 300
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface ExhibitionByPathData {
  route: {
    entity: DrupalExhibition
  } | null
}

async function getExhibition(path: string): Promise<DrupalExhibition | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<ExhibitionByPathData>({
      query: GET_EXHIBITION_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching exhibition:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/exhibitions/${slug.join('/')}`
  const item = await getExhibition(path)

  if (!item) {
    return { title: 'Exhibition Not Found | Museum' }
  }

  return {
    title: `${item.title} | Museum`,
    description: ((item as any).body?.processed ? (item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 160) : '') || `Learn more about ${item.title}.`,
  }
}

export default async function ExhibitionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/exhibitions/${slug.join('/')}`
  const item = await getExhibition(path)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.14),_transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.2),rgba(2,6,23,0.95))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/exhibitions"
            className="mb-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.2em] text-accent-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exhibitions
          </Link>
          <h1 className="font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
            {item.title}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {(item as any).image?.url && (
                <div className="relative mb-8 h-64 overflow-hidden rounded-[2rem] border border-slate-800 shadow-2xl shadow-black/20 md:h-96">
                  <ResponsiveImage
                    src={(item as any).image.url}
                    alt={(item as any).image.alt || item.title}
                    fill
                    className="object-cover"
                    variations={(item as any).image.variations}
                    targetWidth={800}
                  />
                </div>
              )}

              {(item as any).body?.processed && (
                <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8">
                  <div
                    className="prose prose-lg prose-invert prose-slate max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-a:text-accent-300"
                    dangerouslySetInnerHTML={{ __html: (item as any).body.processed }}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6">
                <h3 className="mb-4 text-lg font-semibold uppercase tracking-[0.18em] text-accent-300">Details</h3>
                <dl className="space-y-4">
                  {(item as any).subtitle && (
                    <div>
                      <dt className="text-sm text-slate-500">Subtitle</dt>
                      <dd className="font-semibold text-white">{(item as any).subtitle}</dd>
                    </div>
                  )}
                  {(item as any).locationName && (
                    <div>
                      <dt className="text-sm text-slate-500">Gallery Location</dt>
                      <dd className="font-semibold text-white">{(item as any).locationName}</dd>
                    </div>
                  )}
                  {(item as any).curator && (
                    <div>
                      <dt className="text-sm text-slate-500">Curator</dt>
                      <dd className="font-semibold text-white">{(item as any).curator}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="block w-full rounded-full bg-accent-500 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition-colors hover:bg-accent-400"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
