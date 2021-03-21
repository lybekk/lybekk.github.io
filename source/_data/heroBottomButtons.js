const path = require('path');
path1 = path.resolve(__dirname)
var icons = require('./icons.js');

const heroBottomButtons = [
    {
        text: `Email`,
        icon: icons.envelope,
        url: `mailto:contact@lybekk.tech?Subject=Request`,
        target: `_top`,
    },
    {
      text: `GitHub`,
      icon: icons.github,
      url: `https://github.com/lybekk/`,
      target: `_blank`,
    },
    {
      text: `LinkedIn`,
      icon: icons.linkedin.bootstrap,
      url: `https://www.linkedin.com/in/christoffer-lybekk/`,
      target: `_blank`,
    },
]

const button = (x, i) => {
    return `<a
        href="${x.url}"
        rel="noopener"
        aria-label="${x.text}"
        data-text="${x.text}"
        class="interaction"
        target="${x.target}"
        style="
            animation-name: attentionBlink;
            animation-iteration-count: 1;
            animation-duration: .8s;
            animation-delay: ${0.8 + i / 6}s;
            animation-fill-mode: backwards;
            background-color: rgba(255, 255, 255, 0);"
    >
        ${x.icon}
    </a>`
}

module.exports = {
        data: heroBottomButtons,
        html: heroBottomButtons.map(
            (btn, index) => (
                button(btn, index).toString()
            )
        ).join("")
}
