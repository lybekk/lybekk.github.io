import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import simpleanimationsStyles from "../styles/simpleanimations.module.css"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, tableOfContents } = markdownRemark
  return (
    <Layout>
      <div className={`section ${simpleanimationsStyles.slideInRightToLeft}`}>
        <div className="container">
          <div className="card">
            <div className="card-content">
              <h1 className="title">{frontmatter.title}</h1>
              <h2 className="subtitle">{frontmatter.date}</h2>
              <hr />
              <div
                  dangerouslySetInnerHTML={{ __html: tableOfContents }}
                />
              <hr />
              <div className="content">
                <div
                  dangerouslySetInnerHTML={{ __html: html }}
                />
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
      }
      tableOfContents(maxDepth: 6, absolute: false)
    }
  }
`