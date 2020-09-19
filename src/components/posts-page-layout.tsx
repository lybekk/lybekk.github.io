import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"

import { getTheme, FontWeights, Stack, IStackTokens, ActionButton, IIconProps, IStackStyles } from "@fluentui/react/"
import { FontSizes } from "@uifabric/fluent-theme"

const theme = getTheme()

import FluentTableOfContents from "../components/FluentTableOfContents"
import SEO from "../components/seo"
import seoPerson from "../components/seo/person"
import seoOrganization from "../components/seo/organization"
import CheatsheetNotice from "../components/cheatsheetNotice"
import ArticleAuthor from "../components/articleAuthor"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"

const shortcodes = { Link } // Provide common components to mxd files here

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 550,
}

const tagIcon: IIconProps = { iconName: `Tag` }

/**
 * TODO: Consider creating component, I.E. 'inline-card'
 */
const stackStylesInlineCard: IStackStyles = {
  root: {
    boxShadow: theme.effects.elevation8,
    display: `inline-block`,
    padding: `1rem`,
    marginBottom: `2vh`,
  },
}

export default function PageTemplate({ data: { mdx } }) {
  const { frontmatter, tableOfContents, wordCount, timeToRead } = mdx

  const structuredData = {
    "@context": `https://schema.org`,
    "@type": `Article`,
    headline: frontmatter.title,
    name: frontmatter.title,
    description: frontmatter.description,
    editor: `Christoffer Lybekk`,
    genre: `programming`,
    keywords: frontmatter.tags.join(),
    wordcount: wordCount.words,
    url: `https://lybekk.tech${frontmatter.slug}`,
    image: `https://lybekk.tech/lybekk.png`,
    datePublished: frontmatter.date,
    dateCreated: frontmatter.date,
    dateModified: frontmatter.date,
    author: seoPerson,
    publisher: seoOrganization,
    mainEntityOfPage: `https://lybekk.tech`,
  }

  const postStats = {
    "Word count": wordCount.words,
    Sentences: wordCount.sentences,
    Paragraphs: wordCount.paragraphs,
    "Time to read": timeToRead,
  }

  return (
    <>
      <Helmet>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Layout>
        <div className={`${simpleanimationsStyles.slideInRightToLeft}`}>
          <SEO title={frontmatter.title} />
          <h1 style={{ fontSize: FontSizes.size28, fontWeight: FontWeights.semibold }}>{frontmatter.title}</h1>
          <p style={{ fontSize: FontSizes.size16, fontWeight: FontWeights.regular }}>{frontmatter.date}</p>
          <p style={{ fontSize: FontSizes.size18, fontWeight: FontWeights.regular }}>{frontmatter.description}</p>
          <hr className="inset" />
          <Stack
            horizontal
            tokens={stackTokens}
            style={{ marginBottom: `1rem`, display: !tableOfContents.items ? `none` : null }}
          >
            <FluentTableOfContents toc={tableOfContents} />
          </Stack>
          <CheatsheetNotice tags={frontmatter.tags} />
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <hr className="inset" />
          <footer>
            <Stack styles={stackStylesInlineCard}>
              <p style={{ fontSize: FontSizes.size16, fontWeight: FontWeights.regular, margin: 0 }}>
                Explore more articles with similar tags
              </p>
              {frontmatter.tags.map(tag => (
                <Link
                  to={`/tags/${kebabCase(tag)}/`}
                  key={tag}
                  style={{
                    marginRight: `.3rem`,
                  }}
                >
                  <ActionButton iconProps={`Hashtag`}>
                    <span
                      style={{
                        marginRight: `.05rem`,
                        fontSize: `x-large`,
                        opacity: `.6`,
                        color: theme.palette.themePrimary,
                      }}
                    >
                      #
                    </span>
                    {tag}
                  </ActionButton>
                </Link>
              ))}
            </Stack>
            <br />
            <ArticleAuthor />
            <table
              style={{ color: theme.palette.neutralSecondary, background: theme.palette.neutralLight, padding: `1vw` }}
            >
              <thead>
                <tr>
                  <th style={{ fontSize: FontSizes.size16, fontWeight: FontWeights.regular }}>Article stats</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(postStats).map(item => (
                  <tr key={item} style={{ fontSize: FontSizes.size14, fontWeight: FontWeights.regular }}>
                    <td>{item}</td>
                    <td style={{ fontSize: `large`, color: `slategray` }}>{postStats[item]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </footer>
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        tags
      }
      tableOfContents(maxDepth: 6)
      wordCount {
        words
        sentences
        paragraphs
      }
      timeToRead
    }
  }
`
