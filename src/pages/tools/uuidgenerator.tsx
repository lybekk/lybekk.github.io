import React, { ReactNode } from "react"
import { Helmet } from "react-helmet"
import Layout from "../../components/layout"
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup"
import { TextField } from "@fluentui/react/lib/TextField"
import { CompoundButton, Stack, IStackTokens, MessageBar, MessageBarType, DefaultButton } from "@fluentui/react/"
import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator"
import { Text } from "@fluentui/react/lib/Text"
import { saveAs } from "file-saver"
import { getTheme } from "@fluentui/react"

const theme = getTheme()

const preAreaStyle = {
  marginTop: `1vh`,
  color: theme.palette.neutralPrimary,
  backgroundColor: theme.palette.neutralLighter,
  boxShadow: theme.effects.elevation8,
  display: `inline-block`,
  padding: `.8rem`,
}

const stackTokens: IStackTokens = {
  childrenGap: 4,
  maxWidth: 300,
}

const outputOptions: IChoiceGroupOption[] = [
  { key: `text`, text: `Text`, iconProps: { iconName: `NumberedListText` } },
  { key: `csv`, text: `CSV`, iconProps: { iconName: `NumberSequence` } },
  { key: `json`, text: `JSON`, iconProps: { iconName: `Code` } },
]

function generateUUID(): string {
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === `x` ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const pageDescriptionLine1 = `This simple tool generates UUIDs (universally unique identifier) (V4).`
const pageDescriptionLine2 = `The result will be available for download or direct output to screen in CSV, JSON or line-by-line.`

type Props = {}

type State = {
  uuidCount: number
  isInvalidAmount: boolean
  uuidArray: Array<string>
  activeOutputButton: string
  showResults: boolean
  //progressIsActive: number | boolean
  progressIsActive: number | undefined
}

class ToolsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      uuidCount: 42,
      isInvalidAmount: false,
      uuidArray: [],
      activeOutputButton: `text`,
      showResults: false,
      progressIsActive: 0, // 0 stops indeterminate animation
    }
  }

  handleButtonGenerateUUID(): void {
    const times = [...Array(Number(this.state.uuidCount))]
    const newList: string[] = []
    times.forEach(() => {
      newList.push(generateUUID())
    })
    this.setState({ uuidArray: newList })
  }

  downloadResults(): void {
    let content = ``
    let fileExtension = this.state.activeOutputButton === `text` ? `txt` : `csv`
    if (this.state.activeOutputButton === `json`) {
      fileExtension = `json`
      content = JSON.stringify(this.state.uuidArray, null, 2)
    } else {
      content = this.state.uuidArray.join(`\n`)
    }
    const blob = new Blob([content], { type: `text/plain;charset=utf-8` })
    saveAs(blob, `generated_uuids.${fileExtension}`)
  }

  // (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void
  //handleUUIDCountChange(unused: void, value: number): void {
  //handleUUIDCountChange(unused?: React.FormEvent<HTMLElement | HTMLInputElement>, value?: IChoiceGroupOption): void {
  //changeOutput(unused: void, option: { key: string }): void {
  //changeOutput(unused?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
  changeOutput(unused: React.FormEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption): void {
    console.log(unused)
    this.setState({ activeOutputButton: option.key })
  }

  handleUUIDCountChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, inputValue?: string): void {
    let newValue: number
    try {
      newValue = Number(inputValue)
      if (Number.isNaN(newValue)) {
        throw `Not a valid number`
      }
    } catch (error) {
      newValue = 0
    }
    this.setState({ isInvalidAmount: newValue === 0 ? true : false })
    this.setState({ uuidCount: newValue })
  }

  animateProgressIndicator(): void {
    //this.setState({ progressIsActive: true })
    this.setState({ progressIsActive: undefined })
    setTimeout(() => {
      this.setState({ progressIsActive: 0 })
    }, 2500)
  }

  handleButtonGenerateUUIDShow(): void {
    this.animateProgressIndicator()
    this.setState({ showResults: true })
    this.handleButtonGenerateUUID()
  }

  handleButtonGenerateUUIDDownload(): void {
    this.animateProgressIndicator()
    this.setState({ showResults: false })
    this.handleButtonGenerateUUID()
    this.downloadResults()
  }

  /*
  preAreaContent(): string[] {
    if (this.state.activeOutputButton === `json`) {
      return JSON.stringify(this.state.uuidArray, null, 2)
    } else {
      return this.state.uuidArray.map(uuid => {
        return `${uuid}\n`
      })
    }
  }
  */

  render(): ReactNode {
    return (
      <Layout>
        <Helmet title="Tools">
          <meta name="description" content={pageDescriptionLine1 + ` ` + pageDescriptionLine2} />
        </Helmet>
        <div className="container">
          <div className="columns is-centered is-vcentered">
            <div className="column is-narrow">
              <h2 className="title is-2">UUID Generator</h2>
              <ProgressIndicator percentComplete={this.state.progressIsActive} />
              <div className="columns is-centered is-vcentered">
                <div className="column is-narrow">
                  <Text block>{pageDescriptionLine1}</Text>
                  <Text block>{pageDescriptionLine2}</Text>
                </div>
              </div>
              <ChoiceGroup
                label="Choose output format"
                defaultSelectedKey="text"
                options={outputOptions}
                onChange={this.changeOutput.bind(this)}
              />
              <br />
              <Stack horizontal tokens={stackTokens}>
                <TextField
                  label="Amount of UUIDs to generate:"
                  value={String(this.state.uuidCount)}
                  borderless
                  underlined
                  onChange={this.handleUUIDCountChange.bind(this)}
                />
                {/* 
                                  borderless
                                  underlined
                              */}
              </Stack>
              {this.state.uuidCount > 1000 && (
                <MessageBar messageBarType={MessageBarType.warning} isMultiline={false}>
                  A high number of UUIDs may slow down your browser.
                </MessageBar>
              )}
              {this.state.isInvalidAmount && (
                <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                  Must be a number.
                </MessageBar>
              )}
              <br />
              <Stack horizontal tokens={{ childrenGap: 40 }}>
                <CompoundButton
                  primary
                  secondaryText="Display the results below"
                  iconProps={{ iconName: `SeeDo` }}
                  disabled={this.state.isInvalidAmount}
                  onClick={this.handleButtonGenerateUUIDShow.bind(this)}
                >
                  Show
                </CompoundButton>
                <CompoundButton
                  primary
                  secondaryText="Create a file in the chosen output format"
                  iconProps={{ iconName: `Download` }}
                  onClick={this.handleButtonGenerateUUIDDownload.bind(this)}
                >
                  Download
                </CompoundButton>
              </Stack>
              <br />
              <div
                style={{
                  display: this.state.uuidArray.length && this.state.showResults ? `` : `none`,
                }}
              >
                <Text variant="xxLarge">Results</Text>
                <br />
                <pre style={preAreaStyle}>
                  {this.state.activeOutputButton === `json` && JSON.stringify(this.state.uuidArray, null, 2)}
                  {this.state.activeOutputButton !== `json` &&
                    this.state.uuidArray.map(uuid => {
                      return `${uuid}\n`
                    })}
                </pre>
              </div>
            </div>
          </div>
          <div className="columns is-centered is-vcentered">
            <div className="column is-narrow">
              <hr />
              <DefaultButton
                href="https://github.com/lybekk/lybekk.github.io/blob/source/src/pages/tools/uuidgenerator.js"
                target="_blank"
                title="UUID Generator source code"
                iconProps={{ iconName: `FileCode` }}
              >
                Source code
              </DefaultButton>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ToolsPage
