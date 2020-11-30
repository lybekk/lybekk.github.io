import React, { ReactNode } from "react"
import { Helmet } from "react-helmet"
/* Formerly in gatsby-ssr.js */
/**
 * Fluent UI
 */
/* TODO: Clean up imports */
import {
  getTheme,
  Fabric,
  Stack,
  IStackStyles,
  loadTheme,
  CompoundButton,
  IStackTokens,
  MessageBar,
  MessageBarType,
  DefaultButton,
} from "@fluentui/react/"
//import { loadTheme } from "office-ui-fabric-react"

import { Stylesheet, InjectionMode } from "@uifabric/merge-styles"
import { renderStatic } from "@uifabric/merge-styles/lib/server"
import { renderToString } from "react-dom/server"

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }): void => {
  const { html, css } = renderStatic(() => {
    return renderToString(bodyComponent)
  })
  replaceBodyHTMLString(html)
  setHeadComponents([<style dangerouslySetInnerHTML={{ __html: css }} />])
}

import Layout from "../../components/layout"
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup"
import { TextField } from "@fluentui/react/lib/TextField"

import { ProgressIndicator } from "@fluentui/react/lib/ProgressIndicator"
import { Text } from "@fluentui/react/lib/Text"
import { saveAs } from "file-saver"

import { initializeIcons } from "@uifabric/icons"
initializeIcons(`https://lybekk.tech/fluenticons/`)

const theme = getTheme()

const nord = {
  polarNight: {
    nord0: `#2e3440`,
  },
  snowStorm: {
    nord4: `#D8DEE9`,
    nord5: `#E5E9F0`,
    nord6: `#ECEFF4`,
  },
  frost: {
    nord7: `#8fbcbb`,
    nord8: `#88c0d0`,
    nord9: `#81a1c1`,
    nord10: `#5e81ac`,
  },
}

/**
 * Nord theme.
 * https://www.nordtheme.com/docs/colors-and-palettes
 */
loadTheme({
  palette: {
    themePrimary: nord.frost.nord10,
    themeLighterAlt: `#eff6fc`,
    themeLighter: `#deecf9`,
    themeLight: `#c7e0f4`,
    themeTertiary: `#71afe5`,
    themeSecondary: `#2b88d8`,
    themeDarkAlt: `#106ebe`,
    themeDark: `#005a9e`,
    themeDarker: `#004578`,
    neutralLighterAlt: `whitesmoke`,
    neutralLighter: nord.snowStorm.nord6,
    neutralLight: nord.snowStorm.nord5,
    neutralQuaternaryAlt: `#dadada`,
    neutralQuaternary: `#d0d0d0`,
    neutralTertiaryAlt: `#c8c8c8`,
    neutralTertiary: `#c2c2c2`,
    neutralSecondary: `#858585`,
    neutralPrimaryAlt: `#4b4b4b`,
    neutralPrimary: nord.polarNight.nord0,
    neutralDark: `#272727`,
    black: nord.polarNight.nord0,
    white: nord.snowStorm.nord5,
  },
})

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

  changeOutput(unused: React.FormEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption): void {
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

  render(): ReactNode {
    return (
      <Layout>
        <Fabric>
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
                  <div className="gatsby-highlight" data-language="json">
                    <pre className="language-json">
                      <code className="language-json">
                        {this.state.activeOutputButton === `json` && JSON.stringify(this.state.uuidArray, null, 2)}
                        {this.state.activeOutputButton !== `json` &&
                          this.state.uuidArray.map(uuid => {
                            return `${uuid}\n`
                          })}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns is-centered is-vcentered">
              <div className="column is-narrow">
                <hr />
                <DefaultButton
                  href="https://github.com/lybekk/lybekk.github.io/blob/source/src/pages/tools/uuidgenerator.tsx"
                  target="_blank"
                  title="UUID Generator source code"
                  iconProps={{ iconName: `FileCode` }}
                >
                  Source code
                </DefaultButton>
              </div>
            </div>
          </div>
        </Fabric>
      </Layout>
    )
  }
}

export default ToolsPage
