import React, { ReactElement } from "react"
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
import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type css = {
  [className: string]: string
}

const shortcodes = { Link } // Provide common components to mxd files here

const tocHeader = [`In this post`, `Contents`, `Index`, `In in this article`, `Table of contents`]

const tagStyles: css = {
  color: `var(--primary)`,
}

const inlineCardStyles: css = {
  boxShadow: `var(--card-shadow)`,
  display: `inline-block`,
  padding: `1rem`,
  marginBottom: `2vh`,
  height: `fit-content`,
}

export default function PageTemplate({ data: { mdx } }): ReactElement {
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
    words: wordCount.words,
    sentences: wordCount.sentences,
    paragraphs: wordCount.paragraphs,
    "read time": timeToRead + (Number(timeToRead) > 1 ? ` mins` : ` min`),
  }

  const Toc = (): ReactElement => {
    if (!tableOfContents.items) return <></>
    return (
      <div>
        <h3>{tocHeader[Math.floor(Math.random() * tocHeader.length)]}</h3>
        <ul style={{ marginBottom: `1rem`, display: !tableOfContents.items ? `none` : `block` }}>
          {tableOfContents.items.map((item: { url: string | number | null | undefined }) => (
            <TableOfContentsItem headingItem={item} key={item.url} />
          ))}
        </ul>
      </div>
    )
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
          <h1>{frontmatter.title}</h1>
          <p style={{ fontStyle: `italic` }}>Published: {frontmatter.date}</p>
          <p>{frontmatter.description}</p>
          <hr className="inset" />
          <Toc />
          <CheatsheetNotice tags={frontmatter.tags} />
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <hr className="inset" />
          <footer style={{ display: `flex`, flexWrap: `wrap`, gap: `.5vw` }}>
            <ArticleAuthor />
            <div className="card" style={inlineCardStyles}>
              <p style={{ margin: 0 }}>Explore more articles with similar tags</p>
              {frontmatter.tags.map((tag: string) => (
                <Link
                  to={`/tags/${kebabCase(tag)}/`}
                  key={tag}
                  style={{
                    tagStyles,
                    marginRight: `.3rem`,
                  }}
                >
                  <FontAwesomeIcon 
                    style={{
                      marginRight: `.05rem`,
                      fontSize: `large`,
                      opacity: `.6`,
                    }}
                    icon={faHashtag}
                  />
                  {tag}
                </Link>
              ))}
            </div>
            <div className="card" style={{ padding: `1vw` }}>
              <h4 className="dense">Article stats</h4>
              <hr className="inset dense"></hr>
              {Object.keys(postStats).map(item => (
                <p key={item} className="dense">
                  <span style={{ fontSize: `large`, marginRight: `.3rem` }}>{postStats[item]}</span>
                  {item}
                </p>
              ))}
            </div>
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
