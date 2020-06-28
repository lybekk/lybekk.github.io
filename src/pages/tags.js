import React from "react"
import PropTypes from "prop-types"
// Utilities
import kebabCase from "lodash/kebabCase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
// Styles
import simpleanimationsStyles from "../styles/simpleanimations.module.css"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {

  return (
    <Layout>
      <Helmet title={title} />
      <section className="section">
        <div className="container" style={{ marginTop: '15vh' }}>
          <div className="columns is-centered is-vcentered">
            <div className="column is-narrow">
              <h2 className="title is-2">Tags
              <span>
                  <FontAwesomeIcon icon={faTag} className={`has-text-grey-light ${simpleanimationsStyles.spinVertical}`} aria-hidden="true" />
                </span>
              </h2>
              <br />
              <aside className="menu">
                <ul className="menu-list">
                  {group.map((tag, i) => (
                    <li key={i}>
                      <Link
                        to={`/tags/${kebabCase(tag.fieldValue)}/`} 
                        className="panel-block"
                        key={tag.fieldValue} 
                        activeStyle={{ color: "cyan" }}
                      >
                        <span className="has-text-weight-normal is-size-5 is-capitalized">
                          {tag.fieldValue}
                        </span>
                        <span className="ml-1 is-italic	has-text-grey-light has-text-weight-semibold">
                          {tag.totalCount}
                        </span>
                    </Link>
                      </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  )
}
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}
export default TagsPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000, filter: {
      frontmatter: {
        draft: {
          ne: true
        }
      }
    }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`