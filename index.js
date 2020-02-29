function htmlToCanvas(html, width, height, element) {
  const data = `data:image/svg+xml;charset=utf-8,
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}"
      height="${height}">
      <foreignObject width="100%" height="100%" style="${getStyles(element)}">
      ${htmlToXml(html)}
      </foreignObject>
      </svg>`;
  const currentHTML = element.innerHTML;
  const img = new Image();
  let err = false;
  img.onload = function() {
    try {
      if (this.naturalWidth === 0 || this.naturalHeight === 0) {
        err = true;
        element.innerHTML = currentHTML;
      }
    } catch (er) {
      console.log(er);
    }
  };
  img.onerror = function() {
    err = true;
    element.innerHTML = currentHTML;
  };
  img.src = encodeURI(data);
  if (!err) {
    element.innerHTML = "";
    element.appendChild(img);
  }
}
function htmlToXml(html) {
  const doc = document.implementation.createHTMLDocument("");
  doc.write(html);
  doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);
  html = new XMLSerializer().serializeToString(doc.body);
  return html;
}
function getStyles(node) {
  const styles = window.getComputedStyle
    ? getComputedStyle(node.parentNode, null)
    : node.currentStyle;
  let result = `
      font-size: ${styles.fontSize};
      font-family: ${styles.fontFamily};
      font-weight: ${styles.fontWeight};
      text-align: ${styles.textAlign} `;
  result = result.replace(/"/g, "");
  return result;
}

function parseCharacters(content) {
  const rgbHex = /#([0-9A-F][0-9A-F])([0-9A-F][0-9A-F])([0-9A-F][0-9A-F])/gi;
  content = content
    .replace(rgbHex, function(m, r, g, b) {
      return (
        "rgb(" +
        parseInt(r, 16) +
        "," +
        parseInt(g, 16) +
        "," +
        parseInt(b, 16) +
        ")"
      );
    })
    .replace(/#/g, "")
    .replace(/â/g, "'")
    .replace(/â/g, '"')
    .replace(/â/g, '"')
    .replace(/â/g, "'")
    .replace(/â/g, "_")
    .replace(/â/g, "_")
    .replace(/â/g, "_")
    .replace(/â¦/g, "...");
  return content;
}

const convertToImage = elementId => {
  Promise.resolve().then(() => {
    const element = document.getElementById(elementId);
    if (element !== null) {
      content = parseCharacters(element.innerHTML);
      htmlToCanvas(content, element.offsetWidth, element.offsetHeight, element);
    }
  });
};

module.exports = convertToImage;
