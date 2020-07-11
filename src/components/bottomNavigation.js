import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faEnvelope, faFileAlt, faHome } from "@fortawesome/free-solid-svg-icons"

const mailToString = () => {
  const url = typeof window !== 'undefined' ? '&body=%0D%0A---%0D%0ARequest%20made%20at%3A%20' + window.location.href : null;
  return `mailto:feedback@lybekk.tech?subject=Hi!${url}`
};

const feedbackItems = [
  {
    href: mailToString(),
    icon: faEnvelope,
    text: 'Email',
  },
  {
    href: 'https://docs.google.com/forms/d/e/1FAIpQLScdBp2iPp4vd1NCfwmAbl5NMOzYj4LaRtiPUuGK-rBfXkyUEA/viewform?usp=pp_url&entry.1456738885=None+needed',
    icon: faFileAlt,
    text: 'Contact form',
  }
]

const Header = ({ siteTitle }) => (
    <div className={`bottom-navigation ${simpleanimationsStyles.attentionShimmer}`}>
      <div>
        <Link to="/">
    <button
      className="button is-link is-inverted is-rounded" 
      aria-haspopup="true" aria-controls="dropdown-menu4"
    >
      <span className="icon is-small">
        <FontAwesomeIcon icon={faHome} />
      </span>
    </button>
        </Link>
      </div>
      <div className="dropdown is-hoverable is-up is-right">
        <div className="dropdown-trigger">
          <button className="button is-link is-inverted is-rounded" aria-haspopup="true" aria-controls="dropdown-menu4">
            <span className="icon">
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <p>Give feedback</p>
            </div>
            <hr className="dropdown-divider" />
            {feedbackItems.map((item, i) =>
              <div
                className="dropdown-item"
                key={i}
              >
                <a
                  className="has-text-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon is-small mr-1">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  {item.text}
                </a>
              </div>
            )}
          </div>
      </div>
      </div>
      </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header