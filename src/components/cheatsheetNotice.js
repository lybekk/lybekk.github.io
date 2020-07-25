import React from "react"

const CheatsheetNotice = (props) => {

    if (props.tags.includes('Cheatsheet')) {
        return (
            <div className="columns">
                <div className="column is-narrow">
                    <div className="container">
                    <article className="message is-info is-light">
                        <div className="message-body">
                            This cheatsheet is a small collection of handy snippets for quick reference in tricky situations.
                            Feel free to suggest edits, propose additions, complain about something, disagree with content or such and the like.
                            Every feedback is a welcome one.
                        </div>
                    </article>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<></>)
    }

}

export default CheatsheetNotice