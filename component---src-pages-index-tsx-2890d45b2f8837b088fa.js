(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"+AR8":function(e,t,n){e.exports={interaction:"contactButton-module--interaction--SNYVc",attention:"contactButton-module--attention--11Lu8"}},"9Dj+":function(e,t,n){"use strict";var a=n("q1tI"),i=n.n(a),l=n("Wbzz"),o=n("uYhK"),r=n.n(o),c=n("ZLQX"),m=n.n(c),s=n("IP2g"),u=n("wHSu"),d=n("8tEE"),p=[{text:"Email",icon:u.g,href:"mailto:feedback@lybekk.tech?subject=Hi!"+("undefined"!=typeof window?"&body=%0D%0A---%0D%0ARequest%20made%20at%3A%20"+window.location.href:null)},{text:"Contact form",icon:u.h,href:"https://docs.google.com/forms/d/e/1FAIpQLScdBp2iPp4vd1NCfwmAbl5NMOzYj4LaRtiPUuGK-rBfXkyUEA/viewform?usp=pp_url&entry.1456738885=None+needed"},{text:"LinkedIn",icon:d.d,href:"https://www.linkedin.com/in/christoffer-lybekk/"}],f=function(){return i.a.createElement("div",{className:"card "+r.a.attentionShimmer+" "+m.a.container},i.a.createElement(l.Link,{className:"icon-button",to:"/",title:"Home","aria-label":"Home"},i.a.createElement(s.a,{icon:u.k})),i.a.createElement("hr",null),i.a.createElement("div",{className:"dropdown dropup"},i.a.createElement("a",{className:"icon-button",title:"Home","aria-label":"Home",style:{cursor:"initial"}},i.a.createElement(s.a,{icon:u.f})),i.a.createElement("div",{className:"dropdown-content right"},i.a.createElement("span",null,"Give feedback"),i.a.createElement("hr",{className:"inset dense"}),p.map((function(e){return i.a.createElement("a",{href:e.href,key:e.text,target:"_blank"},i.a.createElement("span",null,e.text))})))))},h=(n("gFvO"),{alignItems:"center",minHeight:"95vh",minWidth:"35vw",justifyContent:"center"});t.a=function(e){var t=e.children;Object(l.useStaticQuery)("3649515864");return Object(a.useEffect)((function(){var e=localStorage.getItem("theme")||"default";e&&document.documentElement.setAttribute("data-theme",e)})),i.a.createElement(i.a.Fragment,null,i.a.createElement("main",{id:"mainContainer",style:h},t),i.a.createElement(f,null))}},QeBL:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),i=n.n(a),l=n("qhky"),o=n("vrFN"),r=n("uYhK"),c=n.n(r),m=n("yR+O"),s=n.n(m),u=n("IP2g"),d=n("wHSu"),p=n("8tEE"),f=n("Wbzz"),h={listStyle:"none"},k=[{name:"Projects",expandAriaLabel:"Expand Projects section",collapseAriaLabel:"Collapse Projects section",links:[{name:"offPIM",url:"https://offpim.app",target:"_blank",isExpanded:!0,rel:"noreferrer",links:[{name:"Web app",url:"https://offpim.app",target:"_blank",icon:d.d},{name:"Docs",url:"https://lybekk.tech/offPIM/",target:"_blank",icon:d.b},{name:"Source code",url:"https://github.com/lybekk/offPIM",target:"_blank",icon:d.e}]}]},{name:"Tools",expandAriaLabel:"Expand Tools section",collapseAriaLabel:"Collapse Tools section",links:[{name:"UUID Generator",url:"/tools/uuidgenerator/",icon:d.a},{name:"Netlify Bandwidth Checker",url:"/guide/get-netlify-bandwidth-usage#netlify-bandwidth-checker-tool",icon:d.m},{name:"GitHub Traffic Viewer",url:"https://lybekk.tech/github-stats-dashboard/",icon:p.b}]},{name:"Code snippets",expandAriaLabel:"Expand Tools section",collapseAriaLabel:"Collapse Tools section",links:[{name:"Guides",url:"/tags/guide/",icon:d.c},{name:"Cheatsheets",url:"/tags/cheatsheet/",icon:d.i},{name:"Tags",url:"/tags",icon:d.j}]}],b=function(e){var t=e.item,n=t.name,a=t.url,l=t.target,o=t.rel,r=t.icon,c=r?i.a.createElement(u.a,{style:{marginRight:".4rem"},icon:r}):i.a.createElement("span",null),m=function(){return i.a.createElement(i.a.Fragment,null,c,i.a.createElement("span",null,n))};return"http"===a.slice(0,4)?i.a.createElement("a",{href:a,target:l,rel:o},m()):i.a.createElement(f.Link,{to:a,target:l,rel:o},m())},g=function(e){return i.a.createElement("li",{style:{marginBottom:".4rem"}},i.a.createElement(b,{item:e.item}))},E=function(e){var t=e.item,n=t.hasOwnProperty("links");return i.a.createElement("li",null,i.a.createElement("h3",null,i.a.createElement(b,{item:t})),i.a.createElement("ul",{style:h},n&&t.links.map((function(e){return i.a.createElement(g,{item:e,key:e.name})}))))},y=function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",null,e.item.name),i.a.createElement("ul",{style:h},e.item.links.map((function(e){return i.a.createElement(E,{item:e,key:e.name})}))))},w=function(){return i.a.createElement("aside",{className:c.a.slideInBottomUp+" "+s.a.whiteBackgroundShadow,"aria-label":"Main navigation list",style:{width:"auto",minWidth:250}},k.map((function(e){return i.a.createElement(y,{item:e,key:e.name})})))},v=n("+AR8"),I=n.n(v),x=n("9Dj+"),S=[{text:"Email",icon:d.g,url:"mailto:contact@lybekk.tech?Subject=Request",target:"_top"},{text:"GitHub",icon:p.a,url:"https://github.com/lybekk/",target:"_blank"},{text:"LinkedIn",icon:p.c,url:"https://www.linkedin.com/in/christoffer-lybekk/",target:"_blank"}];c.a.unCollapseVertical,t.default=function(){return Object(a.useEffect)((function(){var e=2400;S.forEach((function(t){var n=document.querySelector('[data-text="'+t.text+'"]');n&&(setTimeout((function(){n.classList.add(I.a.attention)}),e),setTimeout((function(){n.classList.remove(I.a.attention)}),4e3),e+=200)}))}),[]),i.a.createElement(x.a,null,i.a.createElement(l.a,null,i.a.createElement("script",{type:"application/ld+json"},'{\n        "@context": "http://schema.org",\n        "@type": "Blog",\n        "author": {\n          "@type": "Person",\n          "name": "Christoffer Lybekk",\n          "url": "https://lybekk.tech"\n        }\n      }')),i.a.createElement(o.a,{title:"Lybekk Tech",description:"A web developer's portfolio site"}),i.a.createElement("header",{className:""+s.a.navStyle,style:{zIndex:-9e3,left:"4vw"}},i.a.createElement("div",{className:""+c.a.blurIn},i.a.createElement("h1",null,"Lybekk"))),i.a.createElement("section",{className:"l-grid-center-list"},i.a.createElement(w,null)),i.a.createElement("div",{className:""+s.a.navStyle,style:{bottom:0,right:0,zIndex:9e3}},i.a.createElement("div",{style:{alignItems:"center",display:"flex",flexWrap:"wrap",justifyContent:"flex-start"}},S.map((function(e,t){return i.a.createElement("a",{href:e.url,key:t,rel:"noopener","aria-label":e.text,"data-text":e.text,className:I.a.interaction,target:e.target,style:{animationName:c.a.attentionBlink,animationIterationCount:1,animationDuration:".8s",animationDelay:1.4+t/6+"s",animationFillMode:"backwards",backgroundColor:"rgba(255, 255, 255, 0)"}},i.a.createElement(u.a,{icon:e.icon}))})))))}},ZLQX:function(e,t,n){e.exports={container:"bottomnavigation-module--container--1ozSA"}},gFvO:function(e,t,n){},uYhK:function(e,t,n){e.exports={spinVertical:"simpleanimations-module--spinVertical--283JY",attentionBlinkTriple:"simpleanimations-module--attentionBlinkTriple--17DiI",attentionBlink:"simpleanimations-module--attentionBlink--2-Uw8",attentionBlinkOnce:"simpleanimations-module--attentionBlinkOnce--W1KJp",zoomIn:"simpleanimations-module--zoomIn--3cRZ0",blurIn:"simpleanimations-module--blurIn--3ctgp",slideInBottomUp:"simpleanimations-module--slideInBottomUp--2XWgO",slideInTopDown:"simpleanimations-module--slideInTopDown--2MbZe",slideInRightToLeft:"simpleanimations-module--slideInRightToLeft--28CpY",attentionShimmer:"simpleanimations-module--attentionShimmer--1YL11",unCollapseVerticalEdit:"simpleanimations-module--unCollapseVerticalEdit--2Feva",unCollapseVertical:"simpleanimations-module--unCollapseVertical--26tJu"}},vrFN:function(e,t,n){"use strict";var a=n("q1tI"),i=n.n(a),l=n("qhky"),o=n("Wbzz");function r(e){var t=e.description,n=e.lang,a=e.meta,r=e.title,c=Object(o.useStaticQuery)("63159454").site,m=t||c.siteMetadata.description;return i.a.createElement(l.a,{htmlAttributes:{lang:n},title:r,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:m},{property:"og:title",content:r},{property:"og:description",content:m},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:r},{name:"twitter:description",content:m}].concat(a)})}r.defaultProps={lang:"en",meta:[],description:""},t.a=r},"yR+O":function(e,t,n){e.exports={whiteBackgroundShadow:"navStyles-module--whiteBackgroundShadow--12rhs",navStyle:"navStyles-module--navStyle--JNlSr"}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-2890d45b2f8837b088fa.js.map