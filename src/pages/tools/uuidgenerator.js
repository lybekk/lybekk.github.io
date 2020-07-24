import React from "react"

import Layout from "../../components/layout"
import { Helmet } from "react-helmet"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"

import { saveAs } from 'file-saver';

const outputButtons = [
    ['text', faCode],
    ['csv', faCode],
    ['json', faCode],
]

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
        };
    }

    componentDidMount() {
        this.handleButtonGenerateUUID()
    }

    handleUUIDCountChange(e) {
        this.setState({ uuidCount: e.target.value });

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

    render() {
        return (
            <Layout>
                <Helmet title="Tools" />
                <div className="container">
                    <div className="columns is-centered is-vcentered">
                        <div className="column is-narrow">
                            <h2 className="title is-2">UUID Generator</h2>
                            <label className="label">1. Choose output format</label>
                            <div className="field has-addons">
                                {outputButtons.map((btn) =>
                                    <p className="control" key={btn[0]}>
                                        <button
                                            className={`button is-small ${this.state.activeOutputButton === btn[0] ? 'is-selected is-info' : ''}`}
                                            onClick={() => this.setState({ activeOutputButton: btn[0] })}
                                        >
                                            <span className="icon is-small mr-1">
                                                <FontAwesomeIcon icon={btn[1]} />
                                            </span>
                                            <span className="is-uppercase">{btn[0]}</span>
                                        </button>
                                    </p>
                                )
                                }
                            </div>
                            <label className="label">2. Enter amount of UUIDs to generate </label>
                            <div className="field has-addons ">
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        min={1}
                                        max={5000}
                                        placeholder="1?"
                                        onChange={this.handleUUIDCountChange.bind(this)}
                                    />
                                </div>
                                <div className="control">
                                    <a className="button is-primary" onClick={this.handleButtonGenerateUUID.bind(this)}>
                                        Generate
                                    </a>
                                </div>
                            </div>
                            <div className="control is-centered">
                                <label className="label">3. Download (or just copy results)</label>
                                <a className="button is-primary" onClick={this.downloadResults.bind(this)}>
                                    Download
                                </a>
                            </div>
                            <hr />
                            {this.state.uuidCount > 1000 &&
                                <p className="help">May slow down your browser.</p>
                            }
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
                    <div className="columns is-centered is-vcentered">
                        <div className="column is-narrow">
                            <article className="message is-info is-light">
                                <div className="message-body">
                                    * Produces UUID V4.
                                </div>
                            </article>
                        </div>
                    </div>
                </div>

            </Layout>
        )
    }

}

export default ToolsPage