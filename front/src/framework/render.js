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

    if (!fragment) {
      console.error('Render failed: template returned undefined or null');
      return;
    }

  // if the root is empty add everything
   if (!root.firstChild) {
    // first render
    while (fragment.firstChild) {
      root.appendChild(fragment.firstChild);
    }
    return;
  }

  // diff node by node
  const oldChildren = Array.from(root.childNodes);
  const newChildren = Array.from(fragment.childNodes);
  const max = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < max; i++) {
    if (!oldChildren[i]) {
      root.appendChild(newChildren[i]);
    } else if (!newChildren[i]) {
      oldChildren[i].remove();
    } else {
      diff(oldChildren[i], newChildren[i]);
    }
  }
}
