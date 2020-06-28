import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
  <SEO title="404: Not found" />
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Hmm..
          </h1>
          <h2 className="subtitle">
            404 - Page not found
          </h2>
          <Link
            to="/"
            className="button is-info is-inverted"
          >
            Return to somewhere familiar
          </Link>
        </div>
      </div>
    </section>
  </>
)

export default NotFoundPage
