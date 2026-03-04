import { gql } from '@apollo/client'

// Homepage query with stats
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        heroImage {
          url
          alt
          width
          height
          variations(styles: [LARGE, MEDIUM]) {
            name
            url
            width
            height
          }
        }
        statsItems {
          ... on ParagraphStatItem {
            id
            number
            label
          }
        }
        featuredItemsTitle
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

// Exhibitions
export const GET_EXHIBITIONS = gql`
  query GetExhibitions($first: Int = 20) {
    nodeExhibitions(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeExhibition {
          body {
            processed
            summary
          }
          subtitle
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
          gallery {
            url
            alt
            width
            height
          }
          startDate {
            timestamp
          }
          endDate {
            timestamp
          }
          locationName
          admissionInfo {
            processed
          }
          curator
          exhibitionType {
            ... on TermInterface {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const GET_EXHIBITION_BY_PATH = gql`
  query GetExhibitionByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeExhibition {
            id
            title
            path
            body {
              processed
            }
            subtitle
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            gallery {
              url
              alt
              width
              height
            }
            startDate {
              timestamp
            }
            endDate {
              timestamp
            }
            locationName
            admissionInfo {
              processed
            }
            curator
            exhibitionType {
              ... on TermInterface {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`

// Collections
export const GET_COLLECTIONS = gql`
  query GetCollections($first: Int = 20) {
    nodeCollections(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeCollection {
          body {
            processed
            summary
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
          gallery {
            url
            alt
            width
            height
          }
          artist
          dateCreated
          medium
          dimensions
          accessionNumber
          collectionCategory {
            ... on TermInterface {
              id
              name
            }
          }
          onDisplay
        }
      }
    }
  }
`

export const GET_COLLECTION_BY_PATH = gql`
  query GetCollectionByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeCollection {
            id
            title
            path
            body {
              processed
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            gallery {
              url
              alt
              width
              height
            }
            artist
            dateCreated
            medium
            dimensions
            accessionNumber
            collectionCategory {
              ... on TermInterface {
                id
                name
              }
            }
            onDisplay
          }
        }
      }
    }
  }
`

// Events
export const GET_EVENTS = gql`
  query GetEvents($first: Int = 20) {
    nodeEvents(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeEvent {
          body {
            processed
            summary
          }
          eventDate {
            timestamp
          }
          endTime {
            timestamp
          }
          locationName
          ticketPrice
          registrationUrl
          audience
          eventCategory {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_EVENT_BY_PATH = gql`
  query GetEventByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeEvent {
            id
            title
            path
            body {
              processed
            }
            eventDate {
              timestamp
            }
            endTime {
              timestamp
            }
            locationName
            ticketPrice
            registrationUrl
            audience
            eventCategory {
              ... on TermInterface {
                id
                name
              }
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// News
export const GET_NEWS = gql`
  query GetNews($first: Int = 20) {
    nodeNewsItems(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeNews {
          body {
            processed
            summary
          }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          summary {
            processed
          }
          publishedDate {
            timestamp
          }
          authorName
          newsCategory {
            ... on TermInterface {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const GET_NEWS_BY_PATH = gql`
  query GetNewsByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeNews {
            id
            title
            path
            body {
              processed
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
            summary {
              processed
            }
            publishedDate {
              timestamp
            }
            authorName
            newsCategory {
              ... on TermInterface {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`

// Generic route query for pages and other content
export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeExhibition {
            id
            title
            path
            body {
              processed
            }
            subtitle
            image {
              url
              alt
              width
              height
            }
            gallery {
              url
              alt
              width
              height
            }
            startDate {
              timestamp
            }
            endDate {
              timestamp
            }
            locationName
            admissionInfo {
              processed
            }
            curator
            exhibitionType {
              ... on TermInterface {
                id
                name
              }
            }
          }
          ... on NodeCollection {
            id
            title
            path
            body {
              processed
            }
            image {
              url
              alt
              width
              height
            }
            gallery {
              url
              alt
              width
              height
            }
            artist
            dateCreated
            medium
            dimensions
            accessionNumber
            collectionCategory {
              ... on TermInterface {
                id
                name
              }
            }
            onDisplay
          }
          ... on NodeEvent {
            id
            title
            path
            body {
              processed
            }
            eventDate {
              timestamp
            }
            endTime {
              timestamp
            }
            locationName
            ticketPrice
            registrationUrl
            audience
            eventCategory {
              ... on TermInterface {
                id
                name
              }
            }
            image {
              url
              alt
              width
              height
            }
          }
          ... on NodeNews {
            id
            title
            path
            body {
              processed
            }
            summary {
              processed
            }
            publishedDate {
              timestamp
            }
            authorName
            newsCategory {
              ... on TermInterface {
                id
                name
              }
            }
            image {
              url
              alt
              width
              height
            }
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            heroImage {
              url
              alt
              width
              height
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredItemsTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`

// Featured exhibitions for homepage (limit to 3)
export const GET_FEATURED_EXHIBITIONS = gql`
  query GetFeaturedExhibitions {
    nodeExhibitions(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeExhibition {
          subtitle
          startDate {
            timestamp
          }
          endDate {
            timestamp
          }
          locationName
          exhibitionType {
            ... on TermInterface {
              id
              name
            }
          }
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

// Featured news for homepage
export const GET_FEATURED_NEWS = gql`
  query GetFeaturedNews {
    nodeNewsItems(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeNews {
          summary {
            processed
          }
          publishedDate {
            timestamp
          }
          image {
            url
            alt
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
          newsCategory {
            ... on TermInterface {
              id
              name
            }
          }
        }
      }
    }
  }
`

// Upcoming events for homepage
export const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents {
    nodeEvents(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeEvent {
          eventDate {
            timestamp
          }
          locationName
          ticketPrice
          eventCategory {
            ... on TermInterface {
              id
              name
            }
          }
        }
      }
    }
  }
`
