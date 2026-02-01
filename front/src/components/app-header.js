import { MiniComponent } from '../framework/component.js';
import { html } from '../framework/html.js';

class AppHeader extends MiniComponent {
  template() {
    return html`
      <style>
        header {
          background-color: #222;
          color: white;
          padding: 1rem;
          text-align: center;
          font-family: sans-serif;
        }
      </style>
      <header>
        <h1>20K Chat App</h1>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
