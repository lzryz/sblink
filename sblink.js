// ==UserScript==
// @name         SB link
// @version      1.0
// @description  :)
// @author       lazar
// @match        https://www.sorozatbarat.club/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sorozatbarat.club
// @updateURL    https://github.com/lzryz/sblink/blob/main/sblink.js
// @downloadURL  https://github.com/lzryz/sblink/blob/main/sblink.js
// @grant        none
// ==/UserScript==

(function() {
    const searchText = 'Filemoon.sx'; // Itt add meg a keresett szöveget
    const color = '#000000'; // Itt add meg a kívánt színt
    const bcolor = '#FF00FF'; // Itt add meg a kívánt háttér színt

    const regex = new RegExp(`(${searchText})`, 'gi');

    function traverse(node) {
        if (node.nodeType === 3) { // Text node
            const parent = node.parentNode;
            const nodeText = node.textContent;
            if (regex.test(nodeText)) {
                const span = document.createElement('span');
                span.innerHTML = nodeText.replace(regex, `<span class="highlight">$1</span>`);
                parent.replaceChild(span, node);
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') { // Element node, excluding SCRIPT and STYLE tags
            for (let i = node.childNodes.length - 1; i >= 0; i--) {
                traverse(node.childNodes[i]);
            }
        }
    }

    // Adding the highlight class style
    const style = document.createElement('style');
    style.innerHTML = `.highlight { color: ${color}; background-color: ${bcolor}; }`;
    document.head.appendChild(style);

    traverse(document.body);
})();
