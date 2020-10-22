import React from "react"
import TableOfContentsItemRecursion from "./tableOfContentsItem"

let tocHeader = [`In this post`, `Contents`, `Index`, `In in this article`, `Table of contents`]
tocHeader = tocHeader[Math.floor(Math.random() * tocHeader.length)]

const TableOfContentsItem = props => {
  const anchor = props.headingItem.url

  const handleLinkClick = (anchor) => {
    const x = document.querySelector(anchor)
    if (x) {
      setTimeout(() => {
        x.classList.add(`active-link`)
      }, 400)

      setTimeout(() => {
        x.classList.remove(`active-link`)
      }, 2600)
    }
  }

  return (
    <>
      <li>
        <a href={anchor} onClick={() => handleLinkClick(anchor)}>
          {props.headingItem.title}
        </a>
      </li>
      {props.headingItem.items && (
        <ul>
          {props.headingItem.items.map(item => (
            <TableOfContentsItemRecursion headingItem={item} key={item.url} />
          ))}
        </ul>
      )}
    </>
  )
}

export default TableOfContentsItem
