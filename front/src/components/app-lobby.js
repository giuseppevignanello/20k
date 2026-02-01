import { MiniComponent } from '../framework/component.js';
import { html } from '../framework/html.js';
import { socket } from '../services/socket.js';

class AppLobby extends MiniComponent {
  constructor() {
    super();
    this.initState({
      message: '',
      messages: []
    });
  }

    connectedCallback() {
    super.connectedCallback(); 

   socket.on('chat:message', (payload) => {
    this.state.messages = [
      ...this.state.messages,
      payload.message
    ];
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

        <div>
          ${this.state.messages.map(m => `<p>${m}</p>`).join('')}
        </div>
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
      socket.send('chat:message', { message: this.state.message });
    };
  }
}

customElements.define('app-lobby', AppLobby);
