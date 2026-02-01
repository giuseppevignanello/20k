/**
 * This function update only the DOM part that actually change, avoiding total re-rendering
 * It works on nodes, texts, and attributes
 * 
 * @param {Node} oldNode - current DOM node
 * @param {Node} newNode - node generatede by template
 * @returns {Node} - updated DOM
 */
function updateAttributes(oldEl, newEl) {
  // do nothing if is not an el
  if (!(oldEl instanceof Element) || !(newEl instanceof Element)) return;

  // remove attribute that are not in new element
  for (let attr of [...oldEl.attributes]) {
    if (!newEl.hasAttribute(attr.name)) {
      oldEl.removeAttribute(attr.name);
    }
  }

  // add new attributes and update the changed ones
  for (let attr of [...newEl.attributes]) {
    if (oldEl.getAttribute(attr.name) !== attr.value) {
      oldEl.setAttribute(attr.name, attr.value);
    }
  }
}

export function diff(oldNode, newNode) {
  if (!oldNode) return newNode;

  
  if (newNode instanceof DocumentFragment) {
    const fragChildren = [...newNode.childNodes];
    fragChildren.forEach(child => {
      oldNode.appendChild(child);
    });
    return oldNode;
  }

  // if the node type is changed change the whole node
  if (oldNode.nodeName !== newNode.nodeName) {
    oldNode.replaceWith(newNode);
    return newNode;
  }

  // is is changed just the text update just the text
  if (oldNode.nodeType === Node.TEXT_NODE &&
      oldNode.textContent !== newNode.textContent) {
    oldNode.textContent = newNode.textContent;
    return oldNode;
  }

  updateAttributes(oldNode, newNode);

  // recursive diffe on each child
  const oldChildren = Array.from(oldNode.childNodes);
  const newChildren = Array.from(newNode.childNodes); // a copy, not the live NodeList, so it doesn't lost childrens
  const max = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < max; i++) {
    if (!oldChildren[i] && newChildren[i]) {
      oldNode.appendChild(newChildren[i].cloneNode(true)); 
    } else if (!newChildren[i] && oldChildren[i]) {
      oldChildren[i].remove();
    } else if (oldChildren[i] && newChildren[i]) {
      diff(oldChildren[i], newChildren[i]);
    }
  }


  return oldNode;
}
