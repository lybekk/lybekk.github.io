import React, { useEffect, useRef, ReactElement } from "react"
import { Helmet } from "react-helmet"
import SEO from "../components/seo"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"
import contactButtonStyles from "../components/styling/contactButton.module.scss"
import navStyles from "../components/styling/navStyles.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

import { FontWeights, Fabric, Nav, INavLink, INavStyles, INavLinkGroup } from "@fluentui/react/"
import { FontSizes } from "@uifabric/fluent-theme"

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

const navStylesCenter: Partial<INavStyles> = {
  root: {
    width: `auto`,
    minWidth: 250,
  },
}

/**
 * TODO: Create animation on navigation
 * @param ev Todo
 * @param item Todo
 */
function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void {
  if (item && item.name === `News`) {
    alert(`News link clicked`)
  }
}

const navLinkGroups: INavLinkGroup[] = [
  {
    name: `Projects`,
    expandAriaLabel: `Expand Projects section`,
    collapseAriaLabel: `Collapse Projects section`,
    links: [
      {
        name: `offPIM`,
        url: `https://offpim.app`,
        key: `key1`,
        target: `_blank`,
        isExpanded: true,
        rel: `noreferrer`, // TODO: Test if this renders correctly
        links: [
          {
            name: `Web app`,
            url: `https://offpim.app`,
            target: `_blank`,
            icon: `Cloud`,
          },
          {
            name: `Docs`,
            url: `https://lybekk.tech/offPIM/`,
            target: `_blank`,
            icon: `Documentation`,
          },
          {
            name: `Source code`,
            url: `https://github.com/lybekk/offPIM`,
            target: `_blank`,
            icon: `Code`,
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
      },
      {
        name: `Netlify Bandwidth Checker`,
        url: `/guide/get-netlify-bandwidth-usage#netlify-bandwidth-checker-tool`,
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
      },
      {
        name: `Cheatsheets`,
        url: `/tags/cheatsheet/`,
      },
      {
        name: `Tags`,
        url: `/tags`,
      },
    ],
  },
]

const IndexPage = (): ReactElement => {
  const testings2 = useRef(null)

  /**
   * TODO: Implement nav expand effect
   * console.log(testings2)
   * https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
   */
  useEffect(() => {
    /* TODO: Implement expand on animation end
    setTimeout(() => {
      testings2.current.props.groups[0].isExpanded = false
    }, 2500)
    */

    let timer = 2400
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
      }, 4000)
      timer = timer + 200
    })
  }, [])

  return (
    <Fabric>
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
        }}
      >
        <div className={`${simpleanimationsStyles.blurIn}`}>
          <h1 style={{ fontSize: FontSizes.size42, fontWeight: FontWeights.regular, margin: 0 }}>Lybekk</h1>
        </div>
      </header>
      <section
        style={{
          display: `grid`,
          placeItems: `center`,
          height: `100vh`,
          paddingTop: `15vh`,
        }}
      >
        <aside className={`${simpleanimationsStyles.slideInBottomUp} ${navStyles.whiteBackgroundShadow}`}>
          <Nav
            onLinkClick={_onLinkClick}
            ariaLabel="Table of contents"
            styles={navStylesCenter}
            groups={navLinkGroups}
            componentRef={testings2}
          />
        </aside>
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
                animationDelay: `${1.4 + i / 6}s`,
                animationFillMode: `backwards`,
                backgroundColor: `rgba(255, 255, 255, 0)`,
              }}
            >
              <FontAwesomeIcon icon={x.icon} />
            </a>
          ))}
        </div>
      </div>
    </Fabric>
  )
}

export default IndexPage
