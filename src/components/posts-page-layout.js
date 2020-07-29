import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"

import TableOfContentsItem from "../components/tableOfContentsItem"
import SEO from "../components/seo"
import seoPerson from "../components/seo/person"
import seoOrganization from "../components/seo/organization"
import CheatsheetNotice from "../components/cheatsheetNotice"
import ArticleAuthor from "../components/articleAuthor"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"

const shortcodes = { Link } // Provide common components to mxd files here

export default function PageTemplate({ data: { mdx } }) {

  const { frontmatter, tableOfContents, wordCount, timeToRead } = mdx

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    name: frontmatter.title,
    description: frontmatter.description,
    editor: "Christoffer Lybekk",
    genre: "programming",
    keywords: frontmatter.tags.join(),
    wordcount: wordCount.words,
    url: `https://lybekk.tech${frontmatter.slug}`,
    image: "https://lybekk.tech/lybekk.png",
    datePublished: frontmatter.date,
    dateCreated: frontmatter.date,
    dateModified: frontmatter.date,
    author: seoPerson,
    publisher: seoOrganization,
    mainEntityOfPage: "https://lybekk.tech",
  }

  const postStats = {
    'Word count': wordCount.words,
    'Sentences': wordCount.sentences,
    'Paragraphs': wordCount.paragraphs,
    'Time to read': timeToRead,
  };

  return (
    <>
      <Helmet>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Layout>
        <div className={`container ${simpleanimationsStyles.slideInRightToLeft}`}>
          <SEO title={frontmatter.title} />
          <h1 className="title">{frontmatter.title}</h1>
          <h2 className="subtitle">{frontmatter.date}</h2>
          <p><i>{frontmatter.description}</i></p>
          <div id="toctemp" style={{
            display: !tableOfContents.items ? 'none' : null,
          }}>
          <hr />
          <div className="columns">
            <div className="column is-narrow">
              <div className="content">
                <ul>
                  {tableOfContents.items &&
                  tableOfContents.items.map(
                    (item) => <TableOfContentsItem headingItem={item} key={item.url} />
                  )}
                </ul>
              </div>
            </div>
          </div>
          </div>
          <hr />
          <CheatsheetNotice tags={frontmatter.tags} />
          <div className="content">
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </MDXProvider>
          </div>
          <hr />
          <footer>
            <p>Article stats:</p>
            <div className="field is-grouped is-grouped-multiline">
              {Object.keys(postStats).map(item =>
                <div className="control" key={item}>
                  <div className="tags has-addons">
                    <span className="tag is-dark">{item}</span>
                    <span className="tag is-info">{postStats[item]}</span>
                  </div>
                </div>
              )}
            </div>
            <br />
            <p>Explore more articles with the same tag:</p>
            <div className="tags">
              {frontmatter.tags.map(tag =>
                <Link
                  to={`/tags/${kebabCase(tag)}/`}
                  key={tag}
                  style={{
                    marginRight: '.3rem',
                  }}
                >
                  <span className="tag is-link"  >
                    {tag}
                  </span>
                </Link>
              )}
            </div>
            <ArticleAuthor />
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
