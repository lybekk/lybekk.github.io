import { Link } from "gatsby"
//import PropTypes from "prop-types"
import React from "react"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"
//import bottomNavigationStyles from "../components/styling/bottomnavigation.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faEnvelope, faFileAlt, faHome } from "@fortawesome/free-solid-svg-icons"

//import { Stack } from "@fluentui/react/"
import {
  getTheme,
  IconButton,
  IIconProps,
  IContextualMenuProps,
  ContextualMenuItemType,
  Stack,
  DirectionalHint,
  IStackStyles,
} from "@fluentui/react/"

const theme = getTheme()

const mailToString = (): string => {
  const url =
    typeof window !== `undefined` ? `&body=%0D%0A---%0D%0ARequest%20made%20at%3A%20` + window.location.href : null
  return `mailto:feedback@lybekk.tech?subject=Hi!${url}`
}

const feedbackItems = [
  {
    href: mailToString(),
    icon: faEnvelope,
    text: `Email`,
  },
  {
    href: `https://docs.google.com/forms/d/e/1FAIpQLScdBp2iPp4vd1NCfwmAbl5NMOzYj4LaRtiPUuGK-rBfXkyUEA/viewform?usp=pp_url&entry.1456738885=None+needed`,
    icon: faFileAlt,
    text: `Contact form`,
  },
]

const stackStyles: IStackStyles = {
  root: {
    boxShadow: theme.effects.elevation8,
    marginBottom: `2vh`,

    position: `fixed`,
    bottom: `0px`,
    right: 0,
    margin: `1vw`,
    zIndex: 1000,
    backgroundColor: theme.palette.neutralLighterAlt,
    padding: `1vh`,
    display: `flex`,
    justifyContent: `flex-end`,
  },
}

const homeIcon: IIconProps = { iconName: `Home` }
const sendIcon: IIconProps = { iconName: `Send` }

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: `section1`,
      itemType: ContextualMenuItemType.Section,
      sectionProps: {
        topDivider: true,
        bottomDivider: true,
        title: `Give feedback`,
        items: [
          {
            key: `emailMessage`,
            text: `Email`,
            iconProps: { iconName: `Mail` },
            href: mailToString(),
          },
          {
            key: `formEvent`,
            text: `Contact form`,
            iconProps: { iconName: `PageHeaderEdit` },
            href: `https://docs.google.com/forms/d/e/1FAIpQLScdBp2iPp4vd1NCfwmAbl5NMOzYj4LaRtiPUuGK-rBfXkyUEA/viewform?usp=pp_url&entry.1456738885=None+needed`,
          },
        ],
      },
    },
  ],
  directionalHint: DirectionalHint.topCenter,
  directionalHintFixed: true,
}

const BottomNav: React.FunctionComponent = () => (
  <div className={`${simpleanimationsStyles.attentionShimmer}`}>
    <Stack tokens={{ childrenGap: 8 }} horizontal styles={stackStyles}>
      <IconButton href="/" iconProps={homeIcon} title="Home" ariaLabel="Home" />
      <IconButton menuProps={menuProps} iconProps={sendIcon} title="Contact" ariaLabel="Contact" />
    </Stack>
  </div>
)

export default BottomNav
