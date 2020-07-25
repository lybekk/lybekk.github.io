import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../../components/layout"

import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TextField ,MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { CompoundButton, Stack, MessageBar, MessageBarType, DefaultButton } from 'office-ui-fabric-react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import { saveAs } from 'file-saver';

const outputOptions = [
    { key: 'text', text: 'Text', iconProps: { iconName: 'NumberedListText' } },
    { key: 'csv', text: 'CSV', iconProps: { iconName: 'NumberSequence' } },
    { key: 'json', text: 'JSON', iconProps: { iconName: 'Code' } },
];

function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        })
}

class ToolsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uuidCount: 1,
            uuidArray: [],
            activeOutputButton: 'text',
            showResults: false,
            progressIsActive: 0, // 0 stops indeterminate animation
        };
    }

    handleButtonGenerateUUID() {
        const times = [...Array(Number(this.state.uuidCount))];
        let newList = [];
        times.forEach(() => {
            newList.push(generateUUID())
        });
        this.setState({ uuidArray: newList });
    }

    buttonIsActive(btnText) {
        return this.state.activeOutputButton === btnText
    }

    downloadResults() {
        let content = '';
        let fileExtension = this.state.activeOutputButton === 'text' ? 'txt' : 'csv';
        if (this.state.activeOutputButton === 'json') {
            fileExtension = 'json';
            content = JSON.stringify(this.state.uuidArray, null, 2)
        } else {
            content = this.state.uuidArray.join('\n')
        }
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `generated_uuids.${fileExtension}`);
    }

    changeOutput(unused, option) {
        this.setState({ activeOutputButton: option.key })
    }

    handleUUIDCountChange(unused, value) {
        if (typeof value === 'string') {
            value = value.replace(/_/g, "");
        }
        this.setState({ uuidCount: Number(value) });
    }

    animateProgressIndicator() {
        this.setState({ progressIsActive: true });
        setTimeout(() => {
            this.setState({ progressIsActive: 0 });
        }, 2500);
    }

    handleButtonGenerateUUIDShow() {
        this.animateProgressIndicator();
        this.setState({ showResults: true });
        this.handleButtonGenerateUUID()
    }

    handleButtonGenerateUUIDDownload() {
        this.animateProgressIndicator();
        this.setState({ showResults: false });
        this.handleButtonGenerateUUID();
        this.downloadResults();
    }

    render() {
        return (
            <Layout>
                <Helmet title="Tools" />
                <div className="container">
                    <div className="columns is-centered is-vcentered">
                        <div className="column is-narrow">
                            <h2 className="title is-2">UUID Generator</h2>
                            <ChoiceGroup
                                label="Choose output format"
                                defaultSelectedKey="text"
                                options={outputOptions}
                                onChange={this.changeOutput.bind(this)}
                            />
                            <br />
                            <MaskedTextField
                                label="Amount of UUIDs to generate"
                                value={String(this.state.uuidCount)}
                                mask="999999"
                                borderless
                                underlined
                                onChange={this.handleUUIDCountChange.bind(this)}
                            />
                            {this.state.uuidCount > 1000 &&
                                <MessageBar
                                    messageBarType={MessageBarType.warning}
                                    isMultiline={false}
                                >
                                    A high number of UUIDs may slow down your browser.
                                </MessageBar>
                            }
                            <br />
                            <Stack horizontal tokens={{ childrenGap: 40 }}>
                                <CompoundButton
                                    primary
                                    secondaryText="Displays the results below"
                                    iconProps={{ iconName: 'TextBox' }}
                                    onClick={this.handleButtonGenerateUUIDShow.bind(this)}
                                >
                                    Show
                                </CompoundButton>
                                <CompoundButton
                                    primary
                                    secondaryText="Create a file in the chosen output format"
                                    iconProps={{ iconName: 'Download' }}
                                    onClick={this.handleButtonGenerateUUIDDownload.bind(this)}
                                >
                                    Download
                                </CompoundButton>
                            </Stack>
                            <br />
                            <ProgressIndicator percentComplete={this.state.progressIsActive} />
                            <div style={{
                                display: this.state.uuidArray.length && this.state.showResults ? '' : 'none',
                            }}>
                            <h2 className="subtitle">Results</h2>
                            <pre>{
                                this.state.activeOutputButton === 'json' ?
                                    JSON.stringify(this.state.uuidArray, null, 2)
                                    : this.state.uuidArray.map((uuid) => {
                                        return `${uuid}\n`
                                    })
                            }</pre>
                            </div>
                        </div>
                    </div>
                    <div className="columns is-centered is-vcentered">
                        <div className="column is-narrow">
                            <MessageBar>
                                This tool produces UUID V4.
                            </MessageBar>
                        </div>
                    </div>
                    <div className="columns is-centered is-vcentered">
                        <div className="column is-narrow">
                            <hr />
                            <DefaultButton
                                href="https://github.com/lybekk/lybekk.github.io/blob/source/src/pages/tools/uuidgenerator.js"
                                target="_blank"
                                title="UUID Generator source code"
                                iconProps={{ iconName: 'FileCode' }}
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