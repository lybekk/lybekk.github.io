import React from "react"
import { ReactElement } from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import simpleanimationsStyles from "../styles/simpleanimations.module.css"
import { Icon, IIconProps, ActionButton } from "@fluentui/react/"

const chevronIcon: IIconProps = { iconName: `ChevronLeft` }

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

const Tags = ({ pageContext, data }: SourceProps): ReactElement => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = ` post${totalCount === 1 ? `` : `s`} tagged with `
  return (
    <Layout>
      <section>
        <h2>
          <div style={{ display: `inline-block` }} className={`${simpleanimationsStyles.zoomIn}`}>
            {totalCount}
          </div>
          {tagHeader}
          <span>
            {tag}
            <span>
              <Icon iconName="Tag" style={{ marginLeft: `.4rem`, opacity: `.4` }} />
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
        <hr></hr>
        <ActionButton href="/tags" iconProps={chevronIcon} allowDisabledFocus>
          Tags
        </ActionButton>
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
