import React from "react"
import { ReactElement } from "react"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"
import navStyles from "../components/styling/navStyles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAlignJustify,
  faBook,
  faChalkboardTeacher,
  faCloud,
  faCode,
  faFileCode,
  faHashtag,
  faSearchDollar,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"

const listStyles = {
  listStyle: `none`,
}

type navItem = {
  name: string
  expandAriaLabel?: string // not in use ATM
  collapseAriaLabel?: string // not in use ATM
  isExpanded?: boolean // not in use ATM
  links?: Array<navItem> | undefined
  rel?: string
  url?: string
  target?: string
  icon?: IconDefinition
}

type navProps = {
  item: navItem
}

const navLinkGroups: Array<navItem> = [
  {
    name: `Projects`,
    expandAriaLabel: `Expand Projects section`,
    collapseAriaLabel: `Collapse Projects section`,
    links: [
      {
        name: `offPIM`,
        url: `https://offpim.app`,
        target: `_blank`,
        isExpanded: true,
        rel: `noreferrer`, // TODO: Test if this renders correctly
        links: [
          {
            name: `Web app`,
            url: `https://offpim.app`,
            target: `_blank`,
            icon: faCloud,
          },
          {
            name: `Docs`,
            url: `https://lybekk.tech/offPIM/`,
            target: `_blank`,
            icon: faBook,
          },
          {
            name: `Source code`,
            url: `https://github.com/lybekk/offPIM`,
            target: `_blank`,
            icon: faCode,
          },
        ],
      },
    ],
  },
  {
    name: `Tools`,
    expandAriaLabel: `Expand Tools section`,
    collapseAriaLabel: `Collapse Tools section`,
    links: [
      {
        name: `UUID Generator`,
        url: `/tools/uuidgenerator/`,
        icon: faAlignJustify,
      },
      {
        name: `Netlify Bandwidth Checker`,
        url: `/guide/get-netlify-bandwidth-usage#netlify-bandwidth-checker-tool`,
        icon: faSearchDollar,
      },
    ],
  },
  {
    name: `Code snippets`,
    expandAriaLabel: `Expand Tools section`,
    collapseAriaLabel: `Collapse Tools section`,
    links: [
      {
        name: `Guides`,
        url: `/tags/guide/`,
        icon: faChalkboardTeacher,
      },
      {
        name: `Cheatsheets`,
        url: `/tags/cheatsheet/`,
        icon: faFileCode,
      },
      {
        name: `Tags`,
        url: `/tags`,
        icon: faHashtag,
      },
    ],
  },
]

const NavLink = (props: navProps): ReactElement => {
  const { name, url, target, rel, icon } = props.item
  const hasIcon = icon ? <FontAwesomeIcon style={{ marginRight: `.4rem` }} icon={icon} /> : <span></span>
  const fa = (): ReactElement => (
    <>
      {hasIcon}
      <span>{name}</span>
    </>
  )
  if (url.slice(0, 4) === `http`) {
    return (
      <a href={url} target={target} rel={rel}>
        {fa()}
      </a>
    )
  } else {
    return (
      <Link to={url} target={target} rel={rel}>
        {fa()}
      </Link>
    )
  }
}

const SubLink = (props: navProps): ReactElement => (
  <li style={{ marginBottom: `.4rem` }}>
    <NavLink item={props.item} />
  </li>
)

const LinkItem = (props: navProps): ReactElement => {
  const item = props.item
  const hasLinks = item.hasOwnProperty(`links`)
  return (
    <li>
      <h3>
        <NavLink item={item} />
      </h3>
      <ul style={listStyles}>{hasLinks && item.links.map(link => <SubLink item={link} key={link.name} />)}</ul>
    </li>
  )
}

const HeaderItem = (props: navProps): ReactElement => (
  <>
    <h2>{props.item.name}</h2>
    <ul style={listStyles}>
      {props.item.links.map(link => (
        <LinkItem item={link} key={link.name} />
      ))}
    </ul>
  </>
)

export default (): ReactElement => {
  return (
    <aside
      className={`${simpleanimationsStyles.slideInBottomUp} ${navStyles.whiteBackgroundShadow}`}
      aria-label="Main navigation list"
      style={{ width: `auto`, minWidth: 250 }}
    >
      {navLinkGroups.map(header => (
        <HeaderItem item={header} key={header.name} />
      ))}
      {/* Enable when ready
            <p className="menu-label">Experiments</p>
            <ul className="menu-list">
            <li>
            <Link
                to="/experiments/typewriter"
            >
                Typewriter
            </Link>
            </li>
        </ul>
        */}
    </aside>
  )
}
