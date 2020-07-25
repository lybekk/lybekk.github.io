import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import { Helmet } from "react-helmet"
import SEO from "../components/seo"
import seoPerson from "../components/seo/person"
import seoOrganization from "../components/seo/organization"
import CheatsheetNotice from "../components/cheatsheetNotice"
import ArticleAuthor from "../components/articleAuthor"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {

  const { markdownRemark } = data // data.markdownRemark holds post data
  const { frontmatter, html, tableOfContents, wordCount, timeToRead } = markdownRemark


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
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Layout>
        <div className={`container ${simpleanimationsStyles.slideInRightToLeft}`}>
          <SEO title={frontmatter.title} />
          <h1 className="title">{frontmatter.title}</h1>
          <h2 className="subtitle">{frontmatter.date}</h2>
          <div className="columns">
            <div className="column is-narrow">
              <div className="box">
                <div className="content"
                  dangerouslySetInnerHTML={{ __html: tableOfContents }}
                />
              </div>
            </div>
          </div>
          <CheatsheetNotice tags={frontmatter.tags} />
          <div className="content">
            <div
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <hr />
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
          <ArticleAuthor />
        </div>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        tags
      }
      tableOfContents(maxDepth: 6, absolute: false)
      wordCount {
        words
        sentences
        paragraphs
      }
      timeToRead
    }
  }
`