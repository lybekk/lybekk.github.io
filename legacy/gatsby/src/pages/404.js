import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStepBackward } from "@fortawesome/free-solid-svg-icons"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Hmm..</h1>
          <h2 className="subtitle">
            Page not found
            <span style={{ opacity: `.6`, fontSize: `x-large` }}>404</span>
          </h2>
          <Link to="/">
            <FontAwesomeIcon icon={faStepBackward} />
            Return to somewhere familiar
          </Link>
        </div>
      </div>
    </section>
  </>
)

export default NotFoundPage
