import { MiniComponent } from '../framework/component.js';
import { html } from '../framework/html.js';
import { socket } from '../services/socket.js';
import { api } from '../services/api.js';

class AppLobby extends MiniComponent {
  constructor() {
    super();
    this.initState({
      message: '',
      messages: [], 
      roomId: null, 
      error: null
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
      <button id="createRoomBtn">🎮 Crea stanza</button>

      ${this.state.roomId
        ? `<p>Room ID: <strong>${this.state.roomId}</strong></p>`
        : ''}

      <form id="messageForm">
        <input
          type="text"
          id="messageInput"
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
  const createBtn = this.shadowRoot.getElementById('createRoomBtn');
  if (createBtn) {
    createBtn.onclick = async () => {
      try {
        const { roomId } = await api.createRoom();
        this.state.roomId = roomId;
      } catch (err) {
        this.state.error = err.message;
      }
    };
  }

  // This was added just to test the websocket connection
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
