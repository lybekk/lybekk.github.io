import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faEnvelope, faFileAlt } from "@fortawesome/free-solid-svg-icons"

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
  <nav
    className="navbar is-fixed-bottom "
    role="navigation"
    aria-label="main navigation"
  >
    {/*
    TODO:
    COLOR NAVBAR if on posts, else not?
  */}
    <div className="navbar-brand">
      <h1 className="navbar-item title is-2 has-text-weight-light">
        <Link
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item has-dropdown has-dropdown-up is-hoverable">
          <a className="navbar-link has-text-primary is-arrowless">
            <span className="ml-1">
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
          </a>
          <div className="navbar-dropdown is-boxed">
            <span className="navbar-item">
              Feedback
            </span>
            <hr className="navbar-divider" />
            {feedbackItems.map((item, i) =>
              <a
                className="navbar-item has-text-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                key={i}
              >
                <span className="icon is-small mr-1">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                {item.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
