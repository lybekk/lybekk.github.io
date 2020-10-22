import React, { ReactElement } from "react"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
  tags: string[]
}

const CheatsheetNotice = (props: Props): ReactElement => {
  if (props.tags.includes(`Cheatsheet`)) {
    return (
      <blockquote className="warning" style={{ marginBottom: `1rem`, maxWidth: 450 }}>
        <FontAwesomeIcon icon={faInfoCircle} style={{ float: `right`, fontSize: `larger` }} />
        This cheatsheet is a small collection of handy snippets for quick reference in tricky situations. Feel free to
        suggest edits, propose additions, complain about something, disagree with content or such and the like. Every
        feedback is a welcome one.
      </blockquote>
    )
  } else {
    return <></>
  }
}

export default CheatsheetNotice
