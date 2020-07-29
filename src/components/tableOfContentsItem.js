import React from "react"
import TableOfContentsItemRecursion from "../components/tableOfContentsItem"

const TableOfContentsItem = (props) => {
    return (
        <>
            <li>
                <a href={props.headingItem.url}>{props.headingItem.title}</a>
            </li>
            {props.headingItem.items &&
                <ul>
                    {props.headingItem.items.map(
                        (item) => <TableOfContentsItemRecursion headingItem={item} key={item.url} />
                    )}
                </ul>
            }
        </>
    )
}

export default TableOfContentsItem