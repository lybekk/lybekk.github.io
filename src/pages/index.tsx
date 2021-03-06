import React, { useEffect, ReactElement } from "react"
import { Helmet } from "react-helmet"
import SEO from "../components/seo"

import IndexNav from "../components/indexNav"
import simpleanimationsStyles from "../styles/simpleanimations.module.css"
import contactButtonStyles from "../components/styling/contactButton.module.scss"
import navStyles from "../components/styling/navStyles.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"

/* TODO: Nav effect. Appear from blur (opacity 0->1, small blur, grow)*/
/**
 * TODO: Implement nav expand effect
 * https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
 */

const heroBottomButtons = [
  {
    text: `Email`,
    icon: faEnvelope,
    url: `mailto:contact@lybekk.tech?Subject=Request`,
    target: `_top`,
  },
  {
    text: `GitHub`,
    icon: faGithub,
    url: `https://github.com/lybekk/`,
    target: `_blank`,
  },
  {
    text: `LinkedIn`,
    icon: faLinkedin,
    url: `https://www.linkedin.com/in/christoffer-lybekk/`,
    target: `_blank`,
  },
]

const unCollapseVerticalDefaults = {
  overflow: `hidden`,
  animationName: simpleanimationsStyles.unCollapseVertical,
  animationDuration: `1.2s`,
  animationIterationCount: 1,
  animationTimingFunction: `ease-in-out`,
  animationFillMode: `backwards`,
}

const IndexPage = (): ReactElement => {
  useEffect(() => {
    let timer = 1400
    heroBottomButtons.forEach(element => {
      const btn: HTMLButtonElement | null = document.querySelector(`[data-text="${element.text}"]`)
      if (!btn) {
        return
      }
      setTimeout(() => {
        btn.classList.add(contactButtonStyles.attention)
      }, timer)
      setTimeout(() => {
        btn.classList.remove(contactButtonStyles.attention)
      }, 3500)
      timer = timer + 200
    })
  }, [])

  return (
    <Layout>
      <Helmet>
        <script type="application/ld+json">
          {`{
        "@context": "http://schema.org",
        "@type": "Blog",
        "author": {
          "@type": "Person",
          "name": "Christoffer Lybekk",
          "url": "https://lybekk.tech"
        }
      }`}
        </script>
      </Helmet>
      <SEO title="Lybekk Tech" description="A web developer's portfolio site" />
      <header
        className={`${navStyles.navStyle}`}
        style={{
          zIndex: -9000, // <= impossibru
          left: `4vw`,
        }}
      >
        <div className={`${simpleanimationsStyles.blurIn}`}>
          <h1 style={{ color: `var(--secondary)`, letterSpacing: `.6rem` }}>LYBEKK</h1>
        </div>
      </header>
      <section className="l-grid-center-list">
        <IndexNav />
      </section>
      <div
        className={`${navStyles.navStyle}`}
        style={{
          bottom: 0,
          right: 0,
          zIndex: 9000, // <= over
        }}
      >
        <div
          style={{
            alignItems: `center`,
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `flex-start`,
          }}
        >
          {heroBottomButtons.map((x, i) => (
            <a
              href={x.url}
              key={i}
              rel="noopener"
              aria-label={x.text}
              data-text={x.text}
              className={contactButtonStyles.interaction}
              target={x.target}
              style={{
                animationName: simpleanimationsStyles.attentionBlink,
                animationIterationCount: 1,
                animationDuration: `.8s`,
                animationDelay: `${0.8 + i / 6}s`,
                animationFillMode: `backwards`,
                backgroundColor: `rgba(255, 255, 255, 0)`,
              }}
            >
              <FontAwesomeIcon icon={x.icon} />
            </a>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
