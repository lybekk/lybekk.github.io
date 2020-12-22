import React, { useState } from "react"

const HTML5Page = () => {
  const [dialogState, setDialogState] = useState(false)

  const toggleDialog = value => {
    setDialogState(value)
    //const x = document.querySelector(`#dialogTest`)
    //x.open = false
  }
  
  return (
  <>
    <header>
      <h1>Header (h1)</h1>
      <hgroup>
        <h1>h1 inside hgroup</h1>
        <h2>h2 inside hgroup</h2>
      </hgroup>

      <h1>Heading level 1</h1>
      <h2>Heading level 2</h2>
      <h3>Heading level 3</h3>
      <h4>Heading level 4</h4>
      <h5>Heading level 5</h5>
      <h6>Heading level 6</h6>

      <nav>
        <a href="/">Back</a>
        <a href="#">anchor (a)</a>
      </nav>

      <nav>
        <ul>
            <li><a href="#">Nav</a></li>
            <li><a href="#">With</a></li>
            <li><a href="#">Ul</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section>
        <h2>section (h2)</h2>
        <p>Regular text in paragraph
          <kbd>keyboard</kbd>
          <mark>highlighted text</mark>
          <em>emphasis</em>
          <abbr title="Abbreviated form of a longer word or phrase">abbr</abbr>
          <b>bold</b>
          <code>code</code>
          <i>italic</i>
          <s>strikethrough</s>
          <dfn title="Hover for definition">definition (dfn)</dfn>
          <q cite="lybekk.tech">quotation</q>
          <samp>"samp" typically represents sample output from a computer programs</samp>
          <small>small text</small>
          <strong>strongly emphasized text</strong>
          <sub>subscript</sub>
          <sup>superscript</sup>
          <u>underline</u>
          <var>variable</var>
        </p>
        <br></br>
        <ruby>
          Ruby <rt> annotation </rt>
        </ruby>
        <br />
        <form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
          <input type="range" id="a" value="50" /> +
          <input type="number" id="b" value="100" /> =
          <output name="result" for="a b"></output>
          <br />
          <textarea cols="60" rows="5">textarea - write here...</textarea>
        </form>
      </section>

      <article>
        <h2>article (h2)</h2>
        <br />
        <p>Right click this for a context menu (unsupported in many browsers)</p>
        <menu type="context" id="contextmenu1">
          <menuitem label="Zoom In" icon="zoom-in.png" onClick={() => alert('Clicked!')} />
        </menu>
        <br></br>
        <p>Meter: <meter low="60" high="80" max="100" value="85">Very High</meter></p>
        <p>Progress: <progress value="35" max="100"></progress></p>

        <br></br>
        <button onClick={() => toggleDialog(true)}>Open dialog</button>
        <dialog id="dialogTest" open={dialogState}>
          <p>Are you sure you want to remove this item?</p>
          <p>Dialog uses attribute "open"</p>
          <button type="button" onClick={() => toggleDialog(false)}>?</button>
          <button type="button" onClick={() => toggleDialog(false)}>Close</button>
        </dialog>
        <figure>
          <img src="" alt="An image" />
          <figcaption>Image - caption</figcaption>
        </figure>
      </article>

      <ul>
        <li>Unordered list</li>
        <li>
          <ins>Inserted text (ins)</ins>
        </li>
        <li>
          <ins cite="something">Inserted text with cite attribute (ins)</ins>
        </li>
        <li>
          <ins datetime="2020-12-17T01:55:55Z">Inserted text with datetime attribute (ins)</ins>
        </li>
        <li>
          <del>deleted tag (del)</del>
        </li>
      </ul>

      <ol>
        <li>Ordered</li>
        <li>List</li>
      </ol>

      <dl>
        <dt>Definition list item</dt>
        <dd>Description</dd>
        <dt>term</dt>
        <dd>definition</dd>
      </dl>

      <form>
        <fieldset>
          <legend>fieldset + legend</legend>
          <label for="text-input">Text input:</label>
          <input type="text" name="text-input" id="text-input" />
        </fieldset>
        <fieldset>
          <legend align="bottom">fieldset + legend aligned bottom</legend>
          <input type="checkbox" />
        </fieldset>

<fieldset>

        <select>
          <optgroup label="Sports cars">
            <option value="ferrari">Ferrari</option>
            <option value="lamborghini">Lamborghini</option>
          </optgroup>
          <optgroup label="Luxury cars">
            <option value="mercedes">Mercedes</option>
            <option value="bentley">Bentley</option>
          </optgroup>
        </select>
        <br />
        <input list="books" />
<datalist id="books">
  <option value="Fiction" />
  <option value="Non-Fiction" />
</datalist>
</fieldset>

        <hr></hr>
        <input type="submit" value="Submit" />
        <input type="reset" name="Reset" />
      </form>

      <article>
        <pre>pre  pre
          pre pre   pre
                pre
        pre
        </pre>
        <pre width="80">pre  pre with a maximum of 80 characters per line. preprepreprepre. May be useful
          pre pre   pre
                pre
        pre
        </pre>
      </article>

      <article>
        <table>
          <caption align="left">Table caption - left aligned</caption>
          <thead>
          <tr>
              <th>Table</th>
              <th>Headers</th>
          </tr>
          </thead>
          <tfoot>
            <tr>
              <td colspan="2">Table footer</td>
            </tr>
          </tfoot>
          <tbody>
          <tr>
              <td>row</td>
              <td>1</td>
          </tr>
          <tr>
              <td>row</td>
              <td>2</td>
          </tr>
          </tbody>
        </table>
      </article>

      <hr />

      <section>
        <button>Regular</button>
        <button disabled>Disabled</button>
      </section>
    </main>

    <aside>
      aside
      <details>
        <summary>Summary/details</summary>
        <p>Text appears</p>
      </details>
    </aside>

    <footer>
      <h6>Various (h6)</h6>
      <time datetime="2016-12-31 12:00">31 Dec</time>
      <address>address</address>
      <cite>cite</cite>
      <blockquote>blockquote</blockquote>
    </footer>
  </>
)}

export default HTML5Page
