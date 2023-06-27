/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    siteUrl: "https://ryohei-takagi.me",
    siteType: "website",
    title: "Ryohei's Profile | DevOps Engineer & Architect",
    description: "Ryohei Takagi's Profile site. I'm DevOps Engineer & Architect.",
    imageUrl: "https://ryohei-takagi.me/images/ogp.png",
    twitterCard: "summary",
    twitterUserName: "@_nyoston"
  },
  plugins: ["gatsby-plugin-styled-components", "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          "G-L933HH3XQK",
        ],
        pluginConfig: {
          head: true,
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Ryohei's Profile site",
        short_name: "Ryohei Takagi",
        start_url: "/",
        background_color: "#F7F6F5",
        theme_color: "#F7F6F5",
        display: "minimal-ui",
        icon: "src/images/favicon.png",
      },
    },
  ]
};
