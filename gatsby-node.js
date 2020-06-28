const path = require("path")
const _ = require("lodash")

exports.createPages = async({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve("src/templates/blog.js")
    const tagTemplate = path.resolve("src/templates/tags.js")
    const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000,
        filter: {
          frontmatter: {
            draft: {
              ne: true
            }
          }
        }
      ) {
        edges {
          node {
            frontmatter {
              tags
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000, filter:{
        frontmatter: {
          draft: {
            ne: true
          }
        }
      }) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
        // handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    const posts = result.data.postsRemark.edges
        // Create post detail pages
    posts.forEach(({ node }) => {
            createPage({
                path: node.frontmatter.slug,
                component: blogPostTemplate,
                context: {
                    // Data passed to context is available in page queries as GraphQL variables.
                    slug: node.frontmatter.slug,
                },
            })
        })
        // Extract tag data from query
    const tags = result.data.tagsGroup.group
        // Make tag pages
    tags.forEach(tag => {
        createPage({
            path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
            component: tagTemplate,
            context: {
                tag: tag.fieldValue,
            },
        })
    })
}


exports.onCreateNode = ({ node }) => {
    if (node.internal.type === `MarkdownRemark`) {
        console.log('CREATING NODE:')
        console.log(node.internal.type)
        const fields = ['slug', 'title', 'tags']
        fields.forEach(f => console.log(node.frontmatter[f]))
    }
}