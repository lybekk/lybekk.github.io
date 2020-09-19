import React, { ReactElement } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona"
import { getTheme, Stack, IStackStyles } from "@fluentui/react/"

const theme = getTheme()

const thisPersona = {
  text: `Christoffer Lybekk`,
  secondaryText: `Developer under development`,
  showSecondaryText: true,
}

const stackStyles: IStackStyles = {
  root: {
    boxShadow: theme.effects.elevation8,
    display: `inline-block`,
    padding: `1rem`,
    marginBottom: `2vh`,
  },
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
    <Stack tokens={{ childrenGap: 10 }} styles={stackStyles}>
      {/**
        <Card aria-label="Author contact card" horizontal tokens={cardTokens}>
          <Card.Section>
            <Persona
                {...thisPersona}
                size={PersonaSize.size72}
                imageUrl={data.profileImage.childImageSharp.fluid.src}
                imageAlt="Christoffer Lybekk"
            />
          </Card.Section>
        </Card>
        */}
      <Persona
        {...thisPersona}
        size={PersonaSize.size72}
        imageUrl={data.profileImage.childImageSharp.fluid.src}
        imageAlt="Christoffer Lybekk"
      />
    </Stack>
  )
}
