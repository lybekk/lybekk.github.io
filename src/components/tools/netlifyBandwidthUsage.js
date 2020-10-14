import React, { useState } from "react"
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { PrimaryButton } from 'office-ui-fabric-react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

const columnProps = {
    tokens: { childrenGap: 5 },
    styles: { root: { minWidth: 240 } },
};

const commandBarItems = [
    {
        key: 'viewtoolsourcecode',
        text: 'View tool source code',
        iconProps: { iconName: 'FileCode' },
        href: 'https://github.com/lybekk/lybekk.github.io/blob/source/src/components/tools/netlifyBandwidthUsage.js',
    },
    /* TODO: Implement saving details to local storage for easier rechecks
    {
        key: 'savedetails',
        text: 'Save details',
        iconProps: { iconName: 'Save' },
        onClick: () => console.log('Download'),
    },
    */
];

const commandBarFarItems = [
    {
        key: 'info',
        text: 'Info',
        ariaLabel: 'Info',
        iconOnly: true,
        iconProps: { iconName: 'Info' },
        onClick: () => console.log('Info popup about saving'),
    },
];

const NetlifyBandwidthUsage = () => {

    const [pat, setPat] = useState(""),
        [accName, setAccName] = useState(""),
        [accEmail, setAccEmail] = useState(""),
        [siteName, setSiteName] = useState(""),
        [bandwidthResults, setBandwidthResults] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiUrl = `https://api.netlify.com/api/v1/accounts/${accName}/bandwidth`;

        const netlifyToken = pat;
        try {
            let response = await fetch(apiUrl, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'User-Agent': `${siteName} (${accEmail})`,
                    'Authorization': 'Bearer ' + netlifyToken,
                    "content-type": "application/json",
                },
            })
            const calculate = (value) => {
                return value / 1000000
            };
            const data = await response.json();
            const included = calculate(data.included);
            const used = calculate(data.used);
            setBandwidthResults([
                ['Included in plan', included],
                ['Used', used],
                ['Remaining', included - used],
            ])
        } catch (error) {
            alert(`Something went wrong: ${error}`)
        }

    }

    return (
        <div style={{
            padding: '1rem',
            display: 'inline-block',
            border: '1px solid lightgray',
        }}>
            <Stack {...columnProps}>
                <TextField
                    label="Personal access token"
                    value={pat}
                    onChange={e => setPat(e.target.value)}
                />
                <TextField
                    label="Site name"
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)}
                />
                <TextField
                    label="Account name"
                    value={accName}
                    onChange={e => setAccName(e.target.value)}
                />
                <TextField
                    label="Account Email"
                    value={accEmail}
                    onChange={e => setAccEmail(e.target.value)}
                />
                <PrimaryButton text="Get" onClick={handleSubmit} />
            </Stack>
            <div id="contentBox">
                <table style={{
                    backgroundColor: 'steelblue',
                    color: 'white',
                }}>
                    <tbody>
                        {bandwidthResults.map((item) =>
                            <tr key={item[0]}>
                                <td>{item[0]}</td>
                                <td>{item[1].toFixed(2)} MB</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <CommandBar
                items={commandBarItems}
                ariaLabel="Use left and right arrow keys to navigate between commands"
                />
                {/* TODO: Implement help callout when save implementation is finished
                farItems={commandBarFarItems}
                */}
        </div>
    )
}

export default NetlifyBandwidthUsage
