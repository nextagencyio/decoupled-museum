import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_NEWS } from '@/lib/queries'
import { NewsData } from '@/lib/types'
import Header from '../components/Header'
import NewsCard from '../components/NewsCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'News | Museum',
  description: 'Browse our news.',
}

async function getNews() {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<NewsData>({
      query: GET_NEWS,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    })
    return data?.nodeNewsItems?.nodes || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export default async function NewsPage() {
  const items = await getNews()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.3),rgba(2,6,23,0.95))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-8 h-px w-20 bg-gradient-to-r from-transparent via-accent-400 to-transparent" />
            <h1 className="mb-6 font-display text-4xl font-semibold tracking-[0.08em] md:text-5xl lg:text-6xl">
              News
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Stories, announcements, and editorial updates now carry the same atmosphere, contrast, and typography as the homepage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 px-8 py-16 text-center">
              <h2 className="mb-2 text-2xl font-semibold text-white">No News Yet</h2>
              <p className="text-slate-400">
                News will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
