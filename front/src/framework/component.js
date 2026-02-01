import { reactive } from './reactive.js';
import { render } from './render.js';

/**
 * Basic class for each component
 * Handle:
 *  - Shadow DOM
 *  - Reactive State
 *  - Lifecycle (connectedCallback)
 *  - Automatic rendering
 */
export class MiniComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Init the reactive state
   * @param {Object} initialState 
   */
  initState(initialState) {
    this.state = reactive(initialState, () => this.update());
  }

  /**
   * Lifecycle: called when the component is added to the DOM
   */
  connectedCallback() {
    this.update();
  }

  /**
   * Update the shadowRoot DOM
   */
  update() {
    render(this.shadowRoot, () => this.template());
    this.bindEvents();
  }

  /**
   * To overwrite in the component
   * return an HTML string
   */
  template() {}

  /**
   * To overwrite
   */
  bindEvents() {}
}
