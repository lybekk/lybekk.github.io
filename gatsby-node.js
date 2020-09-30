const path = require(`path`)
const _ = require(`lodash`)
const cheatsheetData = require('./src/data/cheatsheet/cheatsheetData.js')

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  cheatsheetData.forEach(item => {
    const node = {
      name: item.name,
      sections: item.sections,
      language: item.language,
      id: createNodeId(`cheatsheet-${item.name}`),
      internal: {
        type: "Cheatsheet",
        contentDigest: createContentDigest(item),
      },
    }
    actions.createNode(node)
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  //const tagTemplate = path.resolve("src/templates/tags.js")
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
            }
          }
        }
      }
      tagsGroup: allMdx(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
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
      context: { id: node.id },
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
