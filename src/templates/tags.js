import React from "react"
import PropTypes from "prop-types"
// Utilities
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
// Styles
import simpleanimationsStyles from "../styles/simpleanimations.module.css"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = ` post${
    totalCount === 1 ? "" : "s"
    } tagged with `
  return (
    <Layout>
      <section className="section">
      <div className="container" style={{ marginTop: '15vh' }}>
        <div className="columns is-centered is-vcentered">
          <div className="column is-narrow">
            <h2 className="title is-2">
              <div style={ {display: "inline-block"}} className={`${simpleanimationsStyles.zoomIn}`}>
                {totalCount}
              </div>
              {tagHeader}
              <span className="tag is-secondary is-light is-large">
                <span>
                  <FontAwesomeIcon icon={faTag} aria-hidden="true" />
                </span> {tag}
              </span>
            </h2>
            {edges.map(({ node }) => {
              const { slug } = node.frontmatter
              const { title } = node.frontmatter
              const { description } = node.frontmatter
              return (
                <article className="media" key={slug}>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>
                          <Link to={slug}>{title}</Link>
                        </strong>
                        <br />
                        {description}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
            <hr></hr>
            <Link to="/tags">
              <span>
                <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
              </span>
              <span className="ml-1">
                All tags
              </span>
            </Link>
          </div>
        </div>
      </div>
      </section>
    </Layout>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          tags: {
            in: [$tag]
          }
          draft: {
            ne: true
          }
        }
      }
    ) {
      totalCount
      edges {
        node {
        frontmatter {
            title
            slug
            description
          }
        }
      }
    }
  }
`
