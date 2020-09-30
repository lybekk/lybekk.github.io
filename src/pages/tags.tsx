import React, { ReactElement, ReactNode } from "react"
import PropTypes from "prop-types"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
// Styles

import { Stack, Text, ITextProps, Icon, IStackTokens, IStackStyles } from "@fluentui/react/"

type Tag = {
  fieldValue: string
  totalCount: number
}

type Data = {
  data: {
    allMdx: {
      group: [
        {
          fieldValue: string
          totalCount: number
        }
      ]
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const TagsPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
}: Data): ReactElement => {
  return (
    <Layout>
      <Helmet title={title} />
      <div className="l-grid-center-list">
        <div /* Extra div for left text alignment */>
          <h2>
            Tags
            <Icon iconName="Tag" style={{ marginLeft: `.4rem`, opacity: `.4` }} />
          </h2>
          {group.map((tag: Tag, i: number) => (
            <Text variant={`large` as ITextProps["variant"]} key={i} block>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue}
                <span style={{ marginLeft: `.4rem`, opacity: 0.4 }}>({tag.totalCount})</span>
              </Link>
            </Text>
          ))}
        </div>
      </div>
    </Layout>
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
