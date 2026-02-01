import { MiniComponent } from '../framework/component.js';
import { html } from '../framework/html.js';

class AppLobby extends MiniComponent {
  constructor() {
    super();
    this.initState({
      message: ''
    });
  }

  template() {
    return html`
      <div>
        <form id="messageForm">
          <input
            type="text"
            id="messageInput"
            name="message"
            value="${this.state.message}"
          >
          <button type="submit">Send</button>
        </form>

        <p>Message: ${this.state.message}</p>
      </div>
    `;
  }

  bindEvents() {
    const input = this.shadowRoot.getElementById('messageInput');
    input.oninput = (e) => {
      this.state.message = e.target.value;
    };

    const form = this.shadowRoot.getElementById('messageForm');
    form.onsubmit = (e) => {
      e.preventDefault();
      console.log('Sent message:', this.state.message);
    };
  }
}

customElements.define('app-lobby', AppLobby);
