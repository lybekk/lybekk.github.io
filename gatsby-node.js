/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const Prism = require(`prismjs`)
const loadLanguages = require(`prismjs/components/`)
loadLanguages([`python`, `bash`])

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const tagTemplate = path.resolve(`src/templates/tags.tsx`)
  const result = await graphql(`
    {
      postsMdx: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 2000) {
        edges {
          node {
            id
            frontmatter {
              tags
              slug
              cheatsheetDataName
            }
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      cheatsheets: allCheatsheetJson(limit: 2000) {
        edges {
          node {
            name
            language
            sections {
              language
              heading
              items {
                code
                txt
              }
            }
          }
        }
      }
    }
  `)

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`🚨  ERROR: Loading "createPages" query`)
  }

  const posts = result.data.postsMdx.edges
  // Create post detail pages
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`./src/components/posts-page-layout.tsx`),
      context: {
        id: node.id,
        cheatsheetDataName: node.frontmatter.cheatsheetDataName,
      },
    })
  })

  const tags = result.data.tagsGroup.group
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

/**
 * For RSS Feed plugin
 * @param {*} param0
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `CheatsheetJson`) {
    console.log(node.internal.type)
    const value = { ...node.sections }
    node.sections.map(section => {
      section.items.map(item => {
        const lang = item.language || node.language
        const html = Prism.highlight(item.code, Prism.languages[lang], lang)
        item.prismified = html
        return item
      })
      return section
    })
  }
}
