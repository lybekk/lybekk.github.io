import React, { useEffect } from "react"
import { ReactElement } from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHashtag, faStepBackward } from "@fortawesome/free-solid-svg-icons"
import simpleanimationsStyles from "../styles/simpleanimations.module.css"
import symbolGenerator from "../components/modules/symbolGenerator.mjs"

type SourceProps = {
  pageContext: {
    tag: string
  }
  data: {
    allMdx: {
      edges: [
        {
          node: {
            frontmatter: {
              slug: string
              title: string
              description: string
            }
          }
        }
      ]
      totalCount: number
    }
  }
}

/**
 * List all posts for the requested tag
 * @param param0 Data from graphql query
 */
const Tags = ({ pageContext, data }: SourceProps): ReactElement => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = ` post${totalCount === 1 ? `` : `s`} tagged with `

  useEffect(() => {
    symbolGenerator.start('#mainContainer')
  }, [])

  return (
    <Layout>
      <section className="l-grid-center-list">
        <div /* Extra div for left text alignment */>
          <h2>
            <div style={{ display: `inline-block` }} className={`${simpleanimationsStyles.zoomIn}`}>
              {totalCount}
            </div>
            {tagHeader}
            <span>
              {tag}
              <span>
                <FontAwesomeIcon icon={faHashtag} style={{ marginLeft: `.4rem`, opacity: `.4` }} />
              </span>
            </span>
          </h2>
          {edges.map(({ node }) => {
            const { slug } = node.frontmatter
            const { title } = node.frontmatter
            const { description } = node.frontmatter
            return (
              <article key={slug}>
                <p>
                  <strong>
                    <Link to={slug}>{title}</Link>
                  </strong>
                  <br />
                  {description}
                </p>
              </article>
            )
          })}
          <hr className="inset" />
          <Link className="icon-button" to="/tags" title="Tags" aria-label="Tags">
            <FontAwesomeIcon icon={faStepBackward} />
            <span style={{ paddingLeft: `.2rem` }}>Tags</span>
          </Link>
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
    allMdx: PropTypes.shape({
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
    allMdx(limit: 2000, sort: { fields: [frontmatter___title] }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
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
