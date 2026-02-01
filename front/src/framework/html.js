/**
 * This function convert an HTML string in a DocumentFragment 
 * returning all the node included in the string
 * 
 * @param {string} html 
 * @returns {DocumentFragment}
 */
export function htmlToFragment(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

/**
 * Tagged template literal for hint IDE.
 * In VSCODE it work fine with the lit-html extension by Matt Bierner
 * 
 * @param {TemplateStringsArray} strings 
 * @param  {...any} values 
 * @returns {string}
 */
export function html(strings, ...values) {
  return strings.reduce((acc, s, i) => acc + s + (values[i] || ''), '');
}
