import React from "react"
import { Link } from "gatsby"

function typewriter() {
  const objs = document.querySelectorAll("li")

  var timer = 400

  objs.forEach(element => {
    const txt = element.innerHTML
    element.innerHTML = ""

    txt.split("").forEach(letter => {
      timer += Math.floor(Math.random() * 100)

      setTimeout(() => {
        element.innerHTML += letter
      }, timer)
    })
  })
}

const TypewriterPage = () => (
  <div className="container">
    <button onClick={typewriter} className="button is-white">
      Launch
    </button>
    <Link to="/" className="button is-white">
      Go back
    </Link>
    <hr />
    <aside className="menu">
      {/* 
            <p className="menu-label">Typewriter</p>
            */}
      <ul className="menu-list">
        <li>First line</li>
        <li>Second line</li>
      </ul>
    </aside>
  </div>
)

export default TypewriterPage
