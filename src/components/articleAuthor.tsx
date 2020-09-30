import React, { ReactElement } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import authorCard from "./styling/authorCard.module.scss"

const authorContainer = {
  display: `inline-flex`,
}

export default (): ReactElement => {
  const data = useStaticQuery(graphql`
    {
      profileImage: file(relativePath: { eq: "pjofilbilde.png" }) {
        publicURL
        size
        prettySize
        childImageSharp {
          fluid(maxWidth: 128) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className="l-card" style={{ height: `fit-content` }}>
      <div style={authorContainer}>
        <Img
          fluid={data.profileImage.childImageSharp.fluid}
          className={`${authorCard.avatar}`}
          alt="Author Christoffer Lybekk"
        />
        <div>
          <h3 className={`${authorCard.title}`}>Christoffer Lybekk</h3>
          <h4 className={`${authorCard.subtitle}`}>Developer under development</h4>
        </div>
      </div>
    </div>
  )
}
