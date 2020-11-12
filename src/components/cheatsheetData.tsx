import React, { ReactElement, ReactNode } from "react"
import cheatsheetStyles from "./styling/cheatsheet.module.css"

type Props = {
  data: {
    name: string
    language: string
    sections: [
      {
        heading: string
        items: [
          {
            code: string
            prismified: string
            txt: string
            language: string
          }
        ]
      }
    ]
    fields: {
      prismified: string
    }
  }
}

/**
 * If item contains 'cmd', outputs simple <code> tag. If 'script', outputs prismjs block
 * @param props - Gatsby Props
 */
const CheatsheetData = (props: Props): ReactElement => {
  function createSections(sections: Props["data"]["sections"]): ReactNode {
    return sections.map(section => {
      return (
        <div className="card" key={section.heading}>
          <h2>{section.heading}</h2>
          <div className={`${cheatsheetStyles.gridContainer}`}>
            {section.items.map((item, index) => {
              const lang = item.language || props.data.language
              const langString = `language-${lang}`
              return (
                <>
                  <div className={`${cheatsheetStyles.gridItem}`} key={index}>
                    <span>{item.txt}</span>
                  </div>
                  <div className={`${cheatsheetStyles.gridItem}`}>
                    {item.prismified && (
                      <pre className={`${langString}`}>
                        <code className={`${langString}`} dangerouslySetInnerHTML={{ __html: item.prismified }}></code>
                      </pre>
                    )}
                  </div>
                  <hr></hr>
                </>
              )
            })}
          </div>
        </div>
      )
    })
  }

  if (props.data) {
    const data = props.data
    return <div>{createSections(data.sections)}</div>
  } else {
    return <></>
  }
}

export default CheatsheetData
