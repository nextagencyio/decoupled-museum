import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerApolloClient } from '@/lib/apollo-client'
import { GET_COLLECTION_BY_PATH } from '@/lib/queries'
import { DrupalCollection } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 300

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface CollectionByPathData {
  route: {
    entity: DrupalCollection
  } | null
}

async function getCollection(path: string): Promise<DrupalCollection | null> {
  try {
    const requestHeaders = await headers()
    const apolloClient = getServerApolloClient(requestHeaders)
    const { data } = await apolloClient.query<CollectionByPathData>({
      query: GET_COLLECTION_BY_PATH,
      variables: { path },
      fetchPolicy: 'cache-first',
    })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching collection:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/collection/${slug.join('/')}`
  const item = await getCollection(path)

  if (!item) {
    return { title: 'Collection Not Found | Museum' }
  }

  return {
    title: `${item.title} | Museum`,
    description: ((item as any).body?.processed ? (item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 160) : '') || `Learn more about ${item.title}.`,
  }
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/collection/${slug.join('/')}`
  const item = await getCollection(path)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/collection"
            className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {item.title}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {(item as any).image?.url && (
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8">
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
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: (item as any).body.processed }}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
                <dl className="space-y-4">
                  {(item as any).artist && (
                    <div>
                      <dt className="text-sm text-gray-500">Artist / Creator</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).artist}</dd>
                    </div>
                  )}
                  {(item as any).dateCreated && (
                    <div>
                      <dt className="text-sm text-gray-500">Date Created</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).dateCreated}</dd>
                    </div>
                  )}
                  {(item as any).medium && (
                    <div>
                      <dt className="text-sm text-gray-500">Medium</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).medium}</dd>
                    </div>
                  )}
                  {(item as any).dimensions && (
                    <div>
                      <dt className="text-sm text-gray-500">Dimensions</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).dimensions}</dd>
                    </div>
                  )}
                  {(item as any).accessionNumber && (
                    <div>
                      <dt className="text-sm text-gray-500">Accession Number</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).accessionNumber}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors"
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
