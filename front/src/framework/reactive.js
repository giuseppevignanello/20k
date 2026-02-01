/**
 * This function create a reactive state
 * Each time that a propriety change, this function call the 'onChange' callback
 * This is the core of the framework reactivity
 * 
 * @param {Object} obj - initial object of the state
 * @param {Function} onChange - function to call when the state change
 * @returns {Proxy} - reactive objects
 */
export function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, key, value) {
      target[key] = value;
      onChange();
      return true;
    }
  });
}
