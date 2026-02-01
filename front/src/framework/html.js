/**
 * Tagged template literal for hint IDE.
 * In VSCODE it work fine with the lit-html extension by Matt Bierner
 * 
 * @param {TemplateStringsArray} strings 
 * @param  {...any} values 
 * @returns {Node}
 */
export function html(strings, ...values) {
  const template = document.createElement('template');

  let result = '';

  strings.forEach((str, i) => {
    result += str;

    if (values[i] !== undefined) {
      const value = values[i];

      if (Array.isArray(value)) {
        result += value.join('');
      } else {
        result += value;
      }
    }
  });

  template.innerHTML = result.trim();
  return template.content.cloneNode(true); 
}

