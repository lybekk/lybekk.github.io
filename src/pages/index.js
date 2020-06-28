import { Link } from "gatsby"
import React, { useEffect } from 'react';

import Layout from "../components/layout"
import simpleanimationsStyles from "../styles/simpleanimations.module.css"
import SEO from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

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
    //<img src="static/img/brand/GitHub_Logo_White.png" alt="GitHub logo" className="some" />
  },
  {
    text: 'LinkedIn',
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/christoffer-lybekk/',
    target: "_blank",
    //<img src="static/img/brand/linkedin-logo.png" alt="LinkedIn logo" className="some" />
  },
]

const IndexPage = () => {

/*
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
    //animateNavbarItems()
    //console.log('Cool')
  });
*/


  return (
    <Layout>
      <SEO title="Home" />
      <section className="hero is-fullheight">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <h1 className="navbar-item title is-2 has-text-weight-light">
                    <Link
                      to="/"
                    >
                      Lybekk
                </Link>
                </h1>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered is-vcentered">
              <div className="column is-narrow">
                <div className={`card ${simpleanimationsStyles.slideInBottomUp}`}>
                  <div className="card-content">
                    <aside className="menu">
                      <p className="menu-label">Projects</p>
                      <ul className="menu-list">
                        <li>
                          <a href="https://offpim.app" target="_blank" rel="noreferrer">
                            offPIM
                          <span className="tag ml-1 is-primary is-light">Web app</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://lybekk.github.io/offPIM/" target="_blank" rel="noreferrer">
                            offPIM
                          <span className="tag ml-1 is-light">Source code</span>
                          </a>
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
                      <ul className="menu-list">
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
          </div>
        </div>
        <div className="hero-foot">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-menu is-active">
                <div className="navbar-end">
                  {heroBottomButtons.map((x, i) =>
                    <span className="navbar-item" key={i}>
                      <a href={x.url} className={`button 
                                                  is-link 
                                                  is-light`} target={x.target} 
                                                  style={{ 
                                                    animationName: simpleanimationsStyles.attentionBlink,
                                                    animationIterationCount: 1,
                                                    animationDuration: '1.4s',
                                                    animationDelay: `${0.5 + i / 3}s`,
                                                  }}
                                                  >
                        <FontAwesomeIcon icon={x.icon} />
                        <span>{x.text}</span>
                      </a>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </Layout >
  )
}

export default IndexPage
