import { MiniComponent } from '../framework/component.js';
import { html } from '../framework/html.js';

class AppMain extends MiniComponent {
  constructor() {
    super();
    this.initState(
        { 
          variable: true 
        }
      );
  }

  template() {
    return html`
      <app-header></app-header>
      <app-lobby></app-lobby>
    `;
  }

  bindEvents() {
    // this.shadowRoot.getElementById('toggle').onclick = () => {
    //   this.state.variable = !this.state.variable;
    // };
  }
}

customElements.define('app-main', AppMain);
