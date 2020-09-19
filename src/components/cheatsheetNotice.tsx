import React, { ReactElement } from "react"
import { Stack, IStackTokens, MessageBar, MessageBarType } from "@fluentui/react/"

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 550,
}

type Props = {
  tags: string[]
}

const CheatsheetNotice = (props: Props): ReactElement => {
  if (props.tags.includes(`Cheatsheet`)) {
    return (
      <Stack horizontal tokens={stackTokens} style={{ marginBottom: `1rem` }}>
        <MessageBar messageBarType={MessageBarType.warning}>
          This cheatsheet is a small collection of handy snippets for quick reference in tricky situations. Feel free to
          suggest edits, propose additions, complain about something, disagree with content or such and the like. Every
          feedback is a welcome one.
        </MessageBar>
      </Stack>
    )
  } else {
    return <></>
  }
}

export default CheatsheetNotice
