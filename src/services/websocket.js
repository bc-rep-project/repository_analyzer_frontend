export class WebSocketService {
    constructor(url) {
      this.url = url;
      this.socket = null;
      this.listeners = new Map();
    }
  
    connect() {
      this.socket = new WebSocket(this.url);
  
      this.socket.onopen = () => {
        this.emit('open');
      };
  
      this.socket.onmessage = (event) => {
        this.emit('message', JSON.parse(event.data));
      };
  
      this.socket.onerror = (error) => {
        this.emit('error', error);
      };
  
      this.socket.onclose = () => {
        this.emit('close');
      };
    }
  
    on(event, callback) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, new Set());
      }
      this.listeners.get(event).add(callback);
    }
  
    off(event, callback) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).delete(callback);
      }
    }
  
    emit(event, ...args) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).forEach(callback => callback(...args));
      }
    }
  
    send(data) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(data));
      }
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  }