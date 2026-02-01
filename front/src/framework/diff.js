/**
 * This function update only the DOM part that actually change, avoiding total re-rendering
 * It works on nodes, texts, and attributes
 * 
 * @param {Node} oldNode - current DOM node
 * @param {Node} newNode - node generatede by template
 * @returns {Node} - updated DOM
 */
function updateAttributes(oldEl, newEl) {
  // remove attributes that are not in the new element
  for (let attr of [...oldEl.attributes]) {
    if (!newEl.hasAttribute(attr.name)) {
      oldEl.removeAttribute(attr.name);
    }
  }
  
  // add new attribute and update that ones that are changed
  for (let attr of [...newEl.attributes]) {
    if (oldEl.getAttribute(attr.name) !== attr.value) {
      oldEl.setAttribute(attr.name, attr.value);
    }
  }
}

export function diff(oldNode, newNode) {
  if (!oldNode) return newNode;

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
  const oldChildren = oldNode.childNodes;
  const newChildren = newNode.childNodes;
  const max = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < max; i++) {
    if (!oldChildren[i]) {
      oldNode.appendChild(newChildren[i]);
    } else if (!newChildren[i]) {
      oldChildren[i].remove();
    } else {
      diff(oldChildren[i], newChildren[i]);
    }
  }

  return oldNode;
}
