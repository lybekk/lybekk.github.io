import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

const thisPersona = {
    text: 'Christoffer Lybekk',
    secondaryText: 'Developer under development',
    showSecondaryText: true,
}

export default () => {

        const data = useStaticQuery(graphql`
        {
            profileImage: file(relativePath: {eq: "pjofilbilde.png"}) {
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
    <div className="columns">
        <div className="column is-narrow">
        <Persona
            {...thisPersona}
            size={PersonaSize.size72}
            imageUrl={data.profileImage.childImageSharp.fluid.src}
            imageAlt="Christoffer Lybekk"
        />
        </div>
    </div>
)}