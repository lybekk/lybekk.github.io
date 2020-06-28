/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { globalHistory } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./mystyles.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const isIndex = globalHistory.location.pathname === "/";

  return (
    <>
      {!isIndex &&
        <Header siteTitle={data.site.siteMetadata.title} />
      }
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
