import React, { ReactElement, ReactNode } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import BottomNavigation from "./bottomNavigation"
import "./styling/prismjsNord.css"

const itemStyles: React.CSSProperties = {
  alignItems: `center`,
  minHeight: `95vh`,
  minWidth: `35vw`,
  justifyContent: `center`,
}

type Children = {
  children: ReactNode
}

const Layout = ({ children }: Children): ReactElement => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  /**
   * TODO: siteTitle={data.site.siteMetadata.title}
   */
  return (
    <>
      <main style={itemStyles}>{children}</main>
      <BottomNavigation />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
