/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  siteMetadata: {
    title: `Lybekk`,
    description: `Portfolio site.`,
    author: `Christoffer Lybekk`,
    siteUrl: `https://lybekk.tech`,
    imageUrl: `https://www.lybekk.tech/lybekk.png`,
    keywords: `Web developer, Web, Developer, CSS, HTML, JS, JavaScript, Gatsby, CSS3, HTML5, Python, React`,
    twitter: `https://twitter.com/chrislyb`,
    github: `https://github.com/lybekk/`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lybekk Portfolio`,
        short_name: `Lybekk`,
        start_url: `/`,
        background_color: `#2e3440`,
        theme_color: `#2e3440`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/cheatsheet/`,
      },
    },
    {
      // Enables MDX in pages-dir
      resolve: `gatsby-plugin-mdx`,
      extensions: [`.md`, `.mdx`],
      options: {
        //defaultLayouts: {
        //},
        gatsbyRemarkPlugins: [
          `gatsby-remark-graphviz`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false, // Optional
              isIconAfterHeader: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: `superscript`,
                  extend: `javascript`,
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: `root`,
                host: `localhost`,
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
    {
      // Needed for MDX in pages-dir
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts/`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-plugin-matomo`,
      options: {
        siteId: `2`,
        matomoUrl: `https://www.analytics.lybekk.tech`,
        siteUrl: `https://lybekk.tech`,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Lybekk Portfolio RSS Feed`,
          },
        ],
      },
    },
  ],
}
