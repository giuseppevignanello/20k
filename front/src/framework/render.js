import { htmlToFragment } from './html.js';
import { diff } from './diff.js';

/**
 * Main rendering function for the components
 * This function convert the nodes template and update the DOM only when is needed
 * 
 * @param {HTMLElement|ShadowRoot} root - nodo where to insert the template
 * @param {Function} template - function that return a HTML string
 */
export function render(root, template) {
  const fragment = htmlToFragment(template());

  // if the root is empty add everything
  if (!root.firstChild) {
    root.appendChild(fragment.cloneNode(true));
  } else {
    // for the moment this update everything. This part can be improved
    root.innerHTML = '';
    root.appendChild(fragment.cloneNode(true));
  }
}
