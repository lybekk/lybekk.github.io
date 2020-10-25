import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCode } from "@fortawesome/free-solid-svg-icons"

const NetlifyBandwidthUsage = () => {
  const [pat, setPat] = useState(``),
    [accName, setAccName] = useState(``),
    [accEmail, setAccEmail] = useState(``),
    [siteName, setSiteName] = useState(``),
    [bandwidthResults, setBandwidthResults] = useState([]),
    [checkboxState, setCheckboxState] = useState(false)

  useEffect(() => {
    const savedCredentials = localStorage.getItem(`netlifyCredentials`)
    if (savedCredentials) {
      setCheckboxState(true)
      const c = JSON.parse(savedCredentials)
      console.log(c)
      setPat(c[0] || ``)
      setAccName(c[1] || ``)
      setAccEmail(c[2] || ``)
      setSiteName(c[3] || ``)
    }
  }, [])

  const handleSaveCredentials = event => {
    const value = event.target.checked
    if (value) {
      const credentials = [pat, accName, accEmail, siteName]
      localStorage.setItem(`netlifyCredentials`, JSON.stringify(credentials))
    } else {
      localStorage.removeItem(`netlifyCredentials`)
    }
    setCheckboxState(value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const apiUrl = `https://api.netlify.com/api/v1/accounts/${accName}/bandwidth`

    const netlifyToken = pat
    try {
      const response = await fetch(apiUrl, {
        method: `GET`,
        mode: `cors`,
        headers: {
          "User-Agent": `${siteName} (${accEmail})`,
          Authorization: `Bearer ` + netlifyToken,
          "content-type": `application/json`,
        },
      })
      const calculate = value => {
        return value / 1000000
      }
      const data = await response.json()
      const included = calculate(data.included)
      const used = calculate(data.used)
      setBandwidthResults([
        [`Included in plan`, included],
        [`Used`, used],
        [`Remaining`, included - used],
      ])
    } catch (error) {
      alert(`Something went wrong: ${error}`)
    }
  }

  return (
    <div
      style={{
        padding: `1rem`,
        display: `inline-block`,
        border: `1px solid lightgray`,
        minWidth: 240 /* TODO: Test if has effect */,
      }}
    >
      <label>Personal access token</label>
      <input type="text" value={pat} onChange={e => setPat(e.target.value)} />
      <br />
      <label>Site name</label>
      <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} />
      <br />
      <label>Account name</label>
      <input type="text" value={accName} onChange={e => setAccName(e.target.value)} />
      <br />
      <label>Account Email</label>
      <input type="text" value={accEmail} onChange={e => setAccEmail(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Get</button>
      <hr className="dense inset" />
      <input type="checkbox" onChange={handleSaveCredentials} checked={checkboxState} />
      <label style={{ display: `inline-block` }}>Save credentials for next time</label>
      <br />
      <small>* Uses localStorage, an in-browser local storage. Credentials never gets sent to lybekk.tech</small>
      <hr className="dense inset" />
      <div id="contentBox">
        <table
          style={{
            backgroundColor: `steelblue`,
            color: `white`,
          }}
        >
          <tbody>
            {bandwidthResults.map(item => (
              <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1].toFixed(2)} MB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FontAwesomeIcon icon={faFileCode} />
      <a
        href="https://github.com/lybekk/lybekk.github.io/blob/source/src/components/tools/netlifyBandwidthUsage.js"
        aria-label="Use left and right arrow keys to navigate between commands"
      >
        View tool source code
      </a>
    </div>
  )
}

export default NetlifyBandwidthUsage
