/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  siteMetadata: {
    title: `Lybekk`,
    description: `Portfolio site.`,
    author: `Christoffer Lybekk`,
    siteUrl: `https://lybekk.tech`,
    imageUrl: `https://www.lybekk.tech/lybekk.png`,
    keywords: `Web developer, Web, Developer, CSS, HTML, JS, Javascript, Gatsby, CSS3, HTML5`,
    twitter: `https://twitter.com/chrislyb`,
    github: `https://github.com/lybekk/`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#151515`,
        theme_color: `#151515`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
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
            /*
            options: {
                icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`, // Optional
                isIconAfterHeader: true,
            },
            */
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
        matomoUrl: `https://www.analytics.lybekk.tech/`,
        siteUrl: `https://lybekk.tech`,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-robots-txt`,
  ],
}
