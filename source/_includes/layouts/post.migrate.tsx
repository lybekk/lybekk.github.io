/*
TODO: Migrate this to post.njk
*/
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
import CheatsheetData from "../components/cheatsheetData"
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

export default function PageTemplate({ data: { mdx, cheatsheetJson } }): ReactElement {
  const { frontmatter, tableOfContents, wordCount, timeToRead } = mdx

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
      <Layout>

      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String, $cheatsheetDataName: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        publishedRelativeDate: date(fromNow: true)
        updated(formatString: "MMMM DD, YYYY")
        updatedRelativeDate: date(fromNow: true)
        slug
        title
        description
        tags
        cheatsheetDataName
      }
      tableOfContents(maxDepth: 6)
      wordCount {
        words
        sentences
        paragraphs
      }
      timeToRead
    }
    cheatsheetJson(name: { eq: $cheatsheetDataName }) {
      name
      language
      sections {
        language
        heading
        items {
          code
          prismified
          txt
        }
      }
    }
  }
`
