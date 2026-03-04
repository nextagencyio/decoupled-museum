// Shared types
export interface DrupalImage {
  url: string
  alt: string
  width?: number
  height?: number
  variations?: ImageVariation[]
}

export interface ImageVariation {
  name: string
  url: string
  width: number
  height: number
}

export interface DrupalTerm {
  id: string
  name: string
}

// Base node type
export interface DrupalNode {
  __typename: string
  id: string
  title: string
  path: string
  body?: {
    processed: string
    summary?: string
  }
  image?: DrupalImage
}

// Paragraph types
export interface DrupalStatItem {
  id: string
  number: string
  label: string
}

// Homepage
export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  heroImage?: DrupalImage
  statsItems?: DrupalStatItem[]
  featuredItemsTitle?: string
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Exhibition
export interface DrupalExhibition extends DrupalNode {
  subtitle?: string
  gallery?: DrupalImage[]
  startDate?: {
    timestamp: number
  }
  endDate?: {
    timestamp: number
  }
  locationName?: string
  admissionInfo?: {
    processed: string
  }
  curator?: string
  exhibitionType?: DrupalTerm[]
}

export interface ExhibitionsData {
  nodeExhibitions: {
    nodes: DrupalExhibition[]
  }
}

// Collection
export interface DrupalCollection extends DrupalNode {
  gallery?: DrupalImage[]
  artist?: string
  dateCreated?: string
  medium?: string
  dimensions?: string
  accessionNumber?: string
  collectionCategory?: DrupalTerm[]
  onDisplay?: boolean
}

export interface CollectionsData {
  nodeCollections: {
    nodes: DrupalCollection[]
  }
}

// Event
export interface DrupalEvent extends DrupalNode {
  eventDate?: {
    timestamp: number
  }
  endTime?: {
    timestamp: number
  }
  locationName?: string
  ticketPrice?: string
  registrationUrl?: string
  audience?: string
  eventCategory?: DrupalTerm[]
}

export interface EventsData {
  nodeEvents: {
    nodes: DrupalEvent[]
  }
}

// News
export interface DrupalNews extends DrupalNode {
  summary?: {
    processed: string
  }
  publishedDate?: {
    timestamp: number
  }
  authorName?: string
  newsCategory?: DrupalTerm[]
}

export interface NewsData {
  nodeNewsItems: {
    nodes: DrupalNews[]
  }
}

// Basic Page
export interface DrupalPage extends DrupalNode {}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
