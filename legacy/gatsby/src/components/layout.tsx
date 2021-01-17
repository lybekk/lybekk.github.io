import React, { ReactElement, ReactNode, useEffect } from "react"
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

  useEffect(() => {
    const theme = localStorage.getItem(`theme`) || `default`
    if (theme) {
      document.documentElement.setAttribute(`data-theme`, theme)
    }
  })

  return (
    <>
      <main id="mainContainer" style={itemStyles}>{children}</main>
      <BottomNavigation />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
