import { Link } from "gatsby"
import React from "react"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"
import nav from "./styling/bottomnavigation.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faEnvelope, faFileAlt, faHome } from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

const mailToString = (): string => {
  const url =
    typeof window !== `undefined` ? `&body=%0D%0A---%0D%0ARequest%20made%20at%3A%20` + window.location.href : null
  return `mailto:feedback@lybekk.tech?subject=Hi!${url}`
}

const menuProps = [
  {
    text: `Email`,
    icon: faEnvelope,
    href: mailToString(),
  },
  {
    text: `Contact form`,
    icon: faFileAlt,
    href: `https://docs.google.com/forms/d/e/1FAIpQLScdBp2iPp4vd1NCfwmAbl5NMOzYj4LaRtiPUuGK-rBfXkyUEA/viewform?usp=pp_url&entry.1456738885=None+needed`,
  },
  {
    text: `LinkedIn`,
    icon: faLinkedinIn,
    href: `https://www.linkedin.com/in/christoffer-lybekk/`,
  },
]

const BottomNav: React.FunctionComponent = () => (
  <div className={`card ${simpleanimationsStyles.attentionShimmer} ${nav.container}`}>
    <Link className="icon-button" to="/" title="Home" aria-label="Home">
      <FontAwesomeIcon icon={faHome} />
    </Link>
    <hr />
    <div className="dropdown dropup">
      <a className="icon-button" title="Home" aria-label="Home" style={{ cursor: `initial` }}>
        <FontAwesomeIcon icon={faComment} />
      </a>
      <div className="dropdown-content right">
        <span>Give feedback</span>
        <hr className="inset dense" />
        {menuProps.map(item => (
          <a href={item.href} key={item.text} target="_blank">
            <span>{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  </div>
)

export default BottomNav
