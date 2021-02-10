/**
 * Octicons
 * https://octicons-git-v2.primer.now.sh/octicons/
 * https://octicons-git-v2.primer.now.sh/octicons/packages/javascript
 */

var fs = require('fs')
const path = require('path');

var octicons = require("@primer/octicons")
var { icon } = require('@fortawesome/fontawesome-svg-core')
var { faEnvelope } = require('@fortawesome/free-solid-svg-icons');
var { faLinkedin, faGithub } = require('@fortawesome/free-brands-svg-icons')
//TODO: read file => var linkedin = require("../../node_modules/bootstrap-icons/icons∕linkedin.svg")
path1 = path.resolve(__dirname, "../../node_modules/bootstrap-icons/icons/")
const bootstrapLinkedin = fs.readFileSync(path1 + "/" + "linkedin.svg","utf-8")

const iconify = (svgIcon) => {
    return `${svgIcon}`
} 


/**
 * Icons Module
 * @module Icons
 */
module.exports = {
    github: iconify(octicons["mark-github"].toSVG()),
    linkedin: {
        bootstrap: iconify(bootstrapLinkedin),
        fontawesome: iconify(icon(faLinkedin).html),
    },
    envelope: iconify(icon(faEnvelope).html),
}
