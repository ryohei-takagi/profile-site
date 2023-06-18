import * as React from 'react'
import {Helmet} from 'react-helmet'
import {graphql, useStaticQuery} from 'gatsby'

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        siteType
        title
        description
        imageUrl
        twitterCard
        twitterUserName
      }
    }
  }
`

const SEO = () => {
  const { site } = useStaticQuery(query)

  return (
    <Helmet>
      <html lang="ja"/>
      <title>{site.siteMetadata.title}</title>
      <meta name="description" content={site.siteMetadata.description} />
      <meta property="og:type" content={site.siteMetadata.siteType} />
      <meta property="og:url" content={site.siteMetadata.siteUrl} />
      <meta property="og:title" content={site.siteMetadata.title} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:description" content={site.siteMetadata.description} />
      <meta property="og:image" content={site.siteMetadata.imageUrl} />
      <meta name="twitter:card" content={site.siteMetadata.twitterCard} />
      <meta name="twitter:site" content={site.siteMetadata.twitterUserName} />
      <meta name="twitter:url" content={site.siteMetadata.siteUrl} />
      <meta name="twitter:title" content={site.siteMetadata.title} />
      <meta name="twitter:description" content={site.siteMetadata.description} />
      <meta name="twitter:image" content={site.siteMetadata.imageUrl} />
    </Helmet>
  )
}

export default SEO
