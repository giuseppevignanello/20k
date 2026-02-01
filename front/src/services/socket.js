class SocketService {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.listeners = {};
  }

  connect() {
    this.ws = new WebSocket(this.url);

    // get the message from the server and convert it into an event
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.emit(data.type, data.payload);
    };
  }

/**
 * Send to the websocket server
 * @param {string} type 
 * @param {JSON} payload 
 */
  send(type, payload) {
    this.ws.send(JSON.stringify({ type, payload }));
  }

/**
 * A component register itself to listen an event
 * @param {string} type 
 * @param {(payload: any) => void} callback 
 */
  on(type, callback) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

/**
 * event handler. When a message arrive from server 
 * all the interested components are called
 * @param {string} type
 * @param {JSON} payload 
 */
  emit(type, payload) {
    if (!this.listeners[type]) return;
    for (const cb of this.listeners[type]) {
      cb(payload);
    }
  }
}

export const socket = new SocketService('ws://localhost:8080');
