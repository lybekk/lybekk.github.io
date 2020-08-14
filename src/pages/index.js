import { Link } from "gatsby"
import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import SEO from "../components/seo"

import simpleanimationsStyles from "../styles/simpleanimations.module.css"
import contactButtonStyles from "../styles/contactButton.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faCode, faCloud, faBook } from "@fortawesome/free-solid-svg-icons"

const heroBottomButtons = [
  {
    text: 'Email',
    icon: faEnvelope,
    url: 'mailto:contact@lybekk.tech?Subject=Request',
    target: "_top",
  },
  {
    text: 'GitHub',
    icon: faGithub,
    url: 'https://github.com/lybekk/',
    target: "_blank",
  },
  {
    text: 'LinkedIn',
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/christoffer-lybekk/',
    target: "_blank",
  },
]

const offpimList = [
  ["https://offpim.app", faCloud, "Web app"],
  ["https://lybekk.tech/offPIM/", faBook, "Docs"],
  ["https://github.com/lybekk/offPIM", faCode, "Source code"]
]

const whiteBackgroundShadow = {
  //backgroundColor: '#fefcff',
  backgroundColor: 'rgb(254 252 255 / 90%)',
  boxShadow: 'rgb(254 252 255 / 82%) 0px 0.2em 2em 3em, rgb(254 252 255 / 85%) 0px 0px 7px 3px',
}

const navStyles = {
  position: 'fixed',
  ...whiteBackgroundShadow
}

const unCollapseVerticalDefaults = {
  overflow: 'hidden',
  animationName: simpleanimationsStyles.unCollapseVertical,
  animationDuration: '1.2s',
  animationIterationCount: 1,
  animationTimingFunction: 'ease-in-out',
  animationFillMode: 'backwards',
}

const IndexPage = () => {

  useEffect(() => {
    let timer = 2400;
    heroBottomButtons.forEach(element => {
      let btn = document.querySelector(`[data-text="${element.text}"]`);
      setTimeout(() => {
        btn.classList.add(contactButtonStyles.attention)
      }, timer);
      setTimeout(() => {
        btn.classList.remove(contactButtonStyles.attention)
      }, 4000);
      timer = timer + 200;
    });

  }, []);

  return (
    <>
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

      <SEO
        title="Home"
        description="A web developer's portfolio site"
      />

      <header style={{
        ...navStyles,
        zIndex: -9000, // <= impossibru
        //opacity: .1,
      }}>
        <div className={`container ${simpleanimationsStyles.blurIn}`}>
          <div className="navbar-brand">
            <h1 className="navbar-item title is-2 has-text-grey has-text-weight-light">
              Lybekk
            </h1>
          </div>
        </div>
      </header>
      <section style={{
        display: 'grid',
        placeItems: 'center',
        //justifyItems: 'center',
        //alignContent: 'flex-start',
        height: '100vh',
        paddingTop: '25vh',
      }}>
        <div className="">
          <div className="columns is-centered is-vcentered is-mobile">
            <div className="column is-narrow">
              <aside className={`menu ${simpleanimationsStyles.slideInBottomUp}`} style={{
                ...whiteBackgroundShadow
              }}>
                <p className="menu-label">Projects</p>
                <ul
                  className="menu-list"
                  style={{
                    ...unCollapseVerticalDefaults,
                    animationDelay: '1s',
                  }}
                >
                  <li>
                    <a href="https://offpim.app" target="_blank" rel="noreferrer">offPIM</a>
                    <ul>
                      {offpimList.map(item =>
                        <li key={item[2]}>
                          <a href={item[0]} target="_blank" rel="noreferrer">
                            <span className="icon  mr-2">
                              <FontAwesomeIcon icon={item[1]} />
                            </span>
                            <span>{item[2]}</span>
                          </a>
                        </li>
                      )}
                    </ul>
                  </li>
                </ul>
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
                <p className="menu-label">
                  Tools
                </p>
                <ul
                  className="menu-list"
                  style={{
                    ...unCollapseVerticalDefaults,
                    animationDelay: '1s',
                  }}
                >
                  <li>
                    <Link to="/tools/uuidgenerator/">
                      UUID Generator
                    </Link>
                  </li>
                  <li>
                    <Link to="/guide/get-netlify-bandwidth-usage#netlify-bandwidth-checker-tool">
                      Netlify Bandwidth Checker
                    </Link>
                  </li>
                </ul>
                <p className="menu-label">
                  Code snippets
                </p>
                <ul
                  className="menu-list"
                  style={{
                    ...unCollapseVerticalDefaults,
                    animationDelay: '1s',
                  }}
                >
                  <li>
                    <Link to="/tags/guide/">
                      Guides
                          </Link>
                  </li>
                  <li>
                    <Link to="/tags/cheatsheet/">
                      Cheatsheets
                          </Link>
                  </li>
                  <li>
                    <Link to="/tags">
                      Tags
                          </Link>
                  </li>
                </ul>
                <div style={{ height: '75vh' }}></div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <div style={{
        bottom: 0,
        right: 0,
        ...navStyles,
        zIndex: 9000, // <= over
      }}>
        <div className="buttons">
          {heroBottomButtons.map((x, i) =>
            <a
              href={x.url}
              key={i}
              rel="noopener"
              aria-label={x.text}
              data-text={x.text}
              className={`button 
                                    is-link 
                                    is-rounded 
                                    is-large 
                                    is-inverted ` +
                contactButtonStyles.interaction 
              }
              target={x.target}
              style={{
                animationName: simpleanimationsStyles.attentionBlink,
                animationIterationCount: 1,
                animationDuration: '.8s',
                animationDelay: `${1.4 + i / 6}s`,
                animationFillMode: 'backwards',
                backgroundColor: 'rgba(255, 255, 255, 0)',
              }}
            >
              <FontAwesomeIcon icon={x.icon} />
            </a>
          )}
        </div>
      </div>
    </>
  )
}

export default IndexPage
