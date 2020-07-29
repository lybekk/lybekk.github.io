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
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {

  return (
    <Layout>
      <Helmet title={title} />
        <div className="container">
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
                        <span className="has-text-weight-normal is-size-5">
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
    </Layout >
  )
}
TagsPage.propTypes = {
  data: PropTypes.shape({
      allMdx: PropTypes.shape({
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
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`