(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"9Dj+":function(e,t,n){"use strict";var a=n("q1tI"),l=n.n(a),i=n("Wbzz"),o=n("uYhK"),r=n.n(o),c=n("ZLQX"),m=n.n(c),u=n("IP2g"),s=n("wHSu"),d=n("8tEE"),p=[{text:"Email",icon:s.g,href:"mailto:feedback@lybekk.tech?subject=Hi!"+("undefined"!=typeof window?"&body=%0D%0A---%0D%0ARequest%20made%20at%3A%20"+window.location.href:null)},{text:"Contact form",icon:s.h,href:"https://docs.google.com/forms/d/e/1FAIpQLScdBp2iPp4vd1NCfwmAbl5NMOzYj4LaRtiPUuGK-rBfXkyUEA/viewform?usp=pp_url&entry.1456738885=None+needed"},{text:"LinkedIn",icon:d.d,href:"https://www.linkedin.com/in/christoffer-lybekk/"}],f=function(){var e=Object(a.useState)(""),t=e[0],n=e[1];return Object(a.useEffect)((function(){if("undefined"!=typeof window){var e="/"==window.location.pathname?"hidden":"";n(e)}})),l.a.createElement("div",{className:"card "+t+" "+r.a.attentionShimmer+" "+m.a.container},l.a.createElement(i.Link,{className:"icon-button",to:"/",title:"Home","aria-label":"Home"},l.a.createElement(u.a,{icon:s.k})),l.a.createElement("hr",null),l.a.createElement("div",{className:"dropdown dropup"},l.a.createElement("a",{className:"icon-button",title:"Home","aria-label":"Home",style:{cursor:"initial"}},l.a.createElement(u.a,{icon:s.f})),l.a.createElement("div",{className:"dropdown-content right"},l.a.createElement("span",null,"Give feedback"),l.a.createElement("hr",{className:"inset dense"}),p.map((function(e){return l.a.createElement("a",{href:e.href,key:e.text,target:"_blank",rel:"noopener"},l.a.createElement("span",null,e.text))})))))},h=(n("gFvO"),{alignItems:"center",minHeight:"95vh",minWidth:"35vw",justifyContent:"center"});t.a=function(e){var t=e.children;Object(i.useStaticQuery)("3649515864");return Object(a.useEffect)((function(){var e=localStorage.getItem("theme")||"default";e&&document.documentElement.setAttribute("data-theme",e)})),l.a.createElement(l.a.Fragment,null,l.a.createElement("main",{id:"mainContainer",style:h},t),l.a.createElement(f,null))}},NnCg:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",(function(){return g}));var a=n("q1tI"),l=n.n(a),i=n("Wbzz"),o=n("9Dj+"),r=n("IP2g"),c=n("wHSu"),m=n("uYhK"),u=n.n(m);function s(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var p=[["print()"],["console.log()"],["echo"],["if () {","} else {","}"]];function f(e){for(var t=document.createElementNS("http://www.w3.org/2000/svg","text"),n=e.clientX,a=e.clientY,l=String(n+a+Math.floor(1e3*Math.random())),i=0,o=[[null,"x",n],[null,"y",a],[null,"id",l]];i<o.length;i++){var r=o[i];t.setAttributeNS(r[0],r[1],r[2])}t.style.fill="var(--secondary)";for(var c,m,u=s(p[Math.floor(Math.random()*p.length)]);!(c=u()).done;){var d=c.value,f=document.createElementNS("http://www.w3.org/2000/svg","tspan");f.appendChild(document.createTextNode(d)),f.setAttributeNS(null,"x",n),f.setAttributeNS(null,"dy","1.2em"),t.appendChild(f)}document.querySelector("#spawnArea").appendChild(t),m=l,document.getElementById(m).animate([{filter:"blur(0.2rem)",opacity:0},{filter:"blur(0)",opacity:.9},{filter:"blur(0)",opacity:.9},{opacity:.9},{transform:"translateY(-35vh)",opacity:0}],{iterations:1,iterationStart:0,delay:0,endDelay:0,duration:3e3,fill:"forwards",easing:"ease-in"}),setTimeout((function(){try{document.getElementById(m).remove()}catch(e){console.log("Could not remove svg element",e)}}),3500)}var h={start:function(e){void 0===e&&(e=null),function(e){void 0===e&&(e=null);var t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttributeNS(null,"id","spawnArea"),t.setAttributeNS(null,"height","100vh"),t.setAttributeNS(null,"width","100vw"),t.style.position="fixed",t.style.top=0,t.style.left=0,t.style.zIndex=-10,t.style.fontFamily="monospace",t.onmouseenter=function(e){return f(e)},t.ontouchmove=function(e){return f(e)},t.onclick=function(e){f(e)};var n=e||"body";(e=document.querySelector(n)).appendChild(t)}(e||null)}},g=(t.default=function(e){var t=e.pageContext,n=e.data,m=t.tag,s=n.allMdx,d=s.edges,p=s.totalCount,f=" post"+(1===p?"":"s")+" tagged with ";return Object(a.useEffect)((function(){h.start("#mainContainer")}),[]),l.a.createElement(o.a,null,l.a.createElement("section",{className:"l-grid-center-list"},l.a.createElement("div",null,l.a.createElement("h2",null,l.a.createElement("div",{style:{display:"inline-block"},className:""+u.a.zoomIn},p),f,l.a.createElement("span",null,m,l.a.createElement("span",null,l.a.createElement(r.a,{icon:c.j,style:{marginLeft:".4rem",opacity:".4"}})))),d.map((function(e){var t=e.node,n=t.frontmatter.slug,a=t.frontmatter.title,o=t.frontmatter.description;return l.a.createElement("article",{key:n},l.a.createElement("p",null,l.a.createElement("strong",null,l.a.createElement(i.Link,{to:n},a)),l.a.createElement("br",null),o))})),l.a.createElement("hr",{className:"inset"}),l.a.createElement(i.Link,{className:"icon-button",to:"/tags",title:"Tags","aria-label":"Tags"},l.a.createElement(r.a,{icon:c.n}),l.a.createElement("span",{style:{paddingLeft:".2rem"}},"Tags")))))},"3121706106")},ZLQX:function(e,t,n){e.exports={container:"bottomnavigation-module--container--1ozSA"}},gFvO:function(e,t,n){},uYhK:function(e,t,n){e.exports={spinVertical:"simpleanimations-module--spinVertical--283JY",attentionBlinkTriple:"simpleanimations-module--attentionBlinkTriple--17DiI",attentionBlink:"simpleanimations-module--attentionBlink--2-Uw8",attentionBlinkOnce:"simpleanimations-module--attentionBlinkOnce--W1KJp",zoomIn:"simpleanimations-module--zoomIn--3cRZ0",blurIn:"simpleanimations-module--blurIn--3ctgp",slideInBottomUp:"simpleanimations-module--slideInBottomUp--2XWgO",slideInTopDown:"simpleanimations-module--slideInTopDown--2MbZe",slideInRightToLeft:"simpleanimations-module--slideInRightToLeft--28CpY",attentionShimmer:"simpleanimations-module--attentionShimmer--1YL11",unCollapseVerticalEdit:"simpleanimations-module--unCollapseVerticalEdit--2Feva",unCollapseVertical:"simpleanimations-module--unCollapseVertical--26tJu"}}}]);
//# sourceMappingURL=component---src-templates-tags-tsx-cea568a9777f2bafbf54.js.map