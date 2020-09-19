import * as React from "react"
import { getTheme, IStackTokens, Nav, INavLink, INavStyles, INavLinkGroup } from "@fluentui/react/"
import { FontSizes } from "@uifabric/fluent-theme"

const theme = getTheme()

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 550,
}

const navStyles: Partial<INavStyles> = {
  root: {
    width: 550,
    boxSizing: `border-box`,
  },
}

function _onRenderGroupHeader(group: INavLinkGroup): JSX.Element {
  return <h3 style={{ fontSize: FontSizes.size42 }}>Table of contents</h3>
}

/**
 * TODO: Create animation on Toc-click.
 * @param ev Todo
 * @param {object} item Todo
 */
function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void {
  if (!item) {
    return
  }
  const x = document.querySelector(item.url)
  if (x) {
    x.style.color = `white`
    x.style.backgroundColor = theme.palette.themePrimary
    setTimeout(() => {
      x.style.color = `inherit`
      x.style.backgroundColor = `initial`
    }, 400)
  }
}

const FluentTableOfContents: React.FunctionComponent = props => {
  const navLinkGroups: INavLinkGroup[] = () => {
    const tocReplaceStep1 = JSON.stringify(props.toc).split(`"items":`).join(`"links":`)
    const tocReplaceStep2 = tocReplaceStep1.split(`"title":`).join(`"isExpanded": true,"name":`)
    const tocParsed = JSON.parse(tocReplaceStep2)
    const tocHeader = [`In this post`, `Contents`, `Index`, `In in this article`, `Table of contents`]
    tocParsed.name = tocHeader[Math.floor(Math.random() * tocHeader.length)]
    return [tocParsed]
  }

  return <Nav onLinkClick={_onLinkClick} ariaLabel="Table of contents" styles={navStyles} groups={navLinkGroups()} />
}

export default FluentTableOfContents
