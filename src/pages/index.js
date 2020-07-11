import { Link } from "gatsby"
import React from 'react';
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

const IndexPage = () => {

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
      <section className="hero is-fullheight">
        <div className="hero-head">
          <nav className="navbar">
            <div className={`container ${simpleanimationsStyles.blurIn}`}>
              <div className="navbar-brand">
                <h1 className="navbar-item title is-2 has-text-grey has-text-weight-light">
                  Lybekk
                </h1>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered is-vcentered is-mobile">
              <div className="column is-narrow">
                    <aside className={`menu ${simpleanimationsStyles.slideInBottomUp}`}>
                      <p className="menu-label">Projects</p>
                      <ul className={`menu-list ${simpleanimationsStyles.unCollapseVertical}`}>
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
                        Code snippets
                      </p>
                      <ul className="menu-list"
                        style={{
                          overflow: 'hidden',
                          animationName: simpleanimationsStyles.unCollapseVertical,
                          animationDuration: '.8s',
                          animationIterationCount: 1,
                          //animationTimingFunction: 'ease-out',
                          animationTimingFunction: 'ease-in-out',
                          animationDelay: '.9s',
                          animationFillMode: 'backwards',
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
                    </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-end">
                <div className="navbar-item">
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
                          animationDuration: '1.4s',
                          animationDelay: `${0.4 + i / 6}s`,
                          animationFillMode: 'backwards',
                          backgroundColor: 'rgba(255, 255, 255, 0)',
                        }}
                      >
                        <FontAwesomeIcon icon={x.icon} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  )
}

export default IndexPage
