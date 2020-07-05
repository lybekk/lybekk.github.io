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

import BottomNavigation from "./bottomNavigation"
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

  /* Keep for now
  const isIndex = globalHistory.location.pathname === "/";
  */

  return (
    <>
    {/* 
      {!isIndex &&
        <Header siteTitle={data.site.siteMetadata.title} />
      }
    */}
      <section className="section">
      {children}
      </section>
      {/* 
      {!isIndex &&
      }
      */}
      < BottomNavigation siteTitle={data.site.siteMetadata.title} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
