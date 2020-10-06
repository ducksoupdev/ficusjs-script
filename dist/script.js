function evaluates(e){try{return new Function(e)(),!0}catch(e){return!1}}const e={class:function(){return evaluates("class Something {}")},const:function(){return evaluates("const a = 1")},let:function(){return evaluates("let a = 1")},arrowFunction:function(){return evaluates("var f = x => 1")},spread:function(){return evaluates("Math.max(...[ 5, 10 ])")},symbols:function(){return"undefined"!=typeof Symbol&&"function"==typeof Symbol.for},customElement:function(){return evaluates('window.customElements.define("mosaic-is-es6-and-custom-elements-test", class extends HTMLElement {})')},promise:function(){return void 0!==window.Promise&&"function"==typeof window.Promise.resolve},fetch:function(){return void 0!==window.fetch&&void 0!==window.Headers&&void 0!==window.Request&&void 0!==window.Response},typeModule:function(){return"noModule"in HTMLScriptElement.prototype}};function all(...t){return function(e,...t){return t.every((function(t){const r=e[t];return r&&"function"==typeof r?r():(console.warn(`No detection available for '${t}'`),!1)}))}(e,...t)}function esmTest(){return all("symbols","class","const","arrowFunction","typeModule")}function createScript(e,t=null,r=!0){const n=document.createElement("script");return n.setAttribute("type","text/javascript"),n.setAttribute("src",`${e}${function(e=!0){return e?"":"?"+Date.now()}(r)}`),function(e,t){t&&Object.keys(t).forEach((r=>{e.setAttribute(r,t[r])}))}(n,t),n}function createPromise(e){let t={};if(Array.isArray(e)&&2===e.length)esmTest()?(t="string"==typeof e[0]?{url:e[0]}:e[0],(/\.esm\.js/.test(t.url)||"module"===t.type)&&(t.attributes={type:"module"})):t="string"==typeof e[1]?{url:e[1]}:e[1];else if(t="string"==typeof e?{url:e}:e,/\.esm\.js/.test(t.url)||"module"===t.type){if(!esmTest())return Promise.reject(new Error(`Unable to load script '${t.url}' - ES6 not supported by browser!`));t.attributes={type:"module"}}if(!t.url)return Promise.reject(new Error("No url given!"));if(window.__ficusjs__.scripts[t.url])return window.__ficusjs__.scripts[t.url].promise;{const e=new Promise(((e,r)=>{const handleResponse=n=>{if(n.error||n.type&&"error"===n.type)r(n.error);else if(window.__ficusjs__.scripts[t.url].hasLoaded=!0,t.attributes&&t.attributes.type&&"module"===t.attributes.type){const r=function(e){const t=document.createElement("a");return t.href=e,t.href}(t.url);import(r).then((t=>e(t)))}else e()},n=createScript(t.url,t.attributes,t.cache);n.onerror=handleResponse,n.onload=handleResponse,document.body.appendChild(n)}));return window.__ficusjs__.scripts[t.url]={hasLoaded:!1,promise:e},e}}function loadScript(...e){window.__ficusjs__=window.__ficusjs__||{},window.__ficusjs__.scripts=window.__ficusjs__.scripts||{};const t=e.map((e=>createPromise(e)));return Promise.all(t).then((e=>1===e.length?e[0]:e))}export{loadScript};
