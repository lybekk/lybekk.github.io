import React, { ReactElement, ReactNode } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import BottomNavigation from "./bottomNavigation"
import "./styling/globalStyles.scss"
import "./styling/prismjsNord.css"

/**
 * Fluent UI
 */
import { getTheme, Fabric, Stack, IStackStyles } from "@fluentui/react/"
import { initializeIcons } from "@uifabric/icons"
import { loadTheme } from "office-ui-fabric-react"

const theme = getTheme()

initializeIcons(`https://lybekk.tech/fluenticons/`)

const nord = {
  polarNight: {
    nord0: `#2e3440`,
  },
  snowStorm: {
    nord4: `#D8DEE9`,
    nord5: `#E5E9F0`,
    nord6: `#ECEFF4`,
  },
  frost: {
    nord7: `#8fbcbb`,
    nord8: `#88c0d0`,
    nord9: `#81a1c1`,
    nord10: `#5e81ac`,
  },
}

/**
 * Nord theme.
 * https://www.nordtheme.com/docs/colors-and-palettes
 */
loadTheme({
  palette: {
    themePrimary: nord.frost.nord10,
    themeLighterAlt: `#eff6fc`,
    themeLighter: `#deecf9`,
    themeLight: `#c7e0f4`,
    themeTertiary: `#71afe5`,
    themeSecondary: `#2b88d8`,
    themeDarkAlt: `#106ebe`,
    themeDark: `#005a9e`,
    themeDarker: `#004578`,
    neutralLighterAlt: `whitesmoke`,
    neutralLighter: nord.snowStorm.nord6,
    neutralLight: nord.snowStorm.nord5,
    neutralQuaternaryAlt: `#dadada`,
    neutralQuaternary: `#d0d0d0`,
    neutralTertiaryAlt: `#c8c8c8`,
    neutralTertiary: `#c2c2c2`,
    neutralSecondary: `#858585`,
    neutralPrimaryAlt: `#4b4b4b`,
    neutralPrimary: nord.polarNight.nord0,
    neutralDark: `#272727`,
    black: nord.polarNight.nord0,
    white: nord.snowStorm.nord5,
  },
})

const itemStyles: React.CSSProperties = {
  alignItems: `center`,
  //display: `flex`,
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
    <Fabric>
      <main style={itemStyles}>{children}</main>
      <BottomNavigation />
    </Fabric>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
