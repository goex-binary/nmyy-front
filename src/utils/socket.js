import Vue from "vue";
// import { socketUrl } from "@/config/baseUrl";
import { WebSocketEvents } from "./eventName";

export default class Socket {
  constructor(
    socketUrl,
    name,
    maxLinkCount = 3,
    reconnectInterval = 5000,
    heartbeatInterval = 30000
  ) {
    this.socketUrl = socketUrl;
    this.name = name;
    this.maxLinkCount = maxLinkCount;
    this.reconnectInterval = reconnectInterval;
    this.heartbeatInterval = heartbeatInterval;
    this.linkCount = 0;
    this.heartbeat = null;
    this.initWebSocket();
  }

  initWebSocket() {
    if (this.linkCount >= this.maxLinkCount) {
      console.log("达到了最大的重新连接尝试。");
      return false;
    }
    this.linkCount++;
    const url = this.socketUrl;

    if (window.WebSocket) {
      this.webSocket = new WebSocket(url);

      this.webSocket.onopen = ev => {
        console.log(`[${this.name}]`, WebSocketEvents.OPEN);
        this.emit(WebSocketEvents.OPEN, ev);
        this.heartbeat = setInterval(() => {
          this.webSocket.send(1);
        }, this.heartbeatInterval);
      };
      this.webSocket.onclose = ev => {
        console.log(`[${this.name}]`, WebSocketEvents.CLOSE);
        clearInterval(this.heartbeat); // clear heartbeat
        this.emit(WebSocketEvents.CLOSE, ev);
        setTimeout(() => {
          this.initWebSocket();
        }, this.reconnectInterval);
      };
      this.webSocket.onerror = ev => {
        console.log(`[${this.name}]`, WebSocketEvents.ERROR);
        clearInterval(this.heartbeat); // clear heartbeat
        this.emit(WebSocketEvents.ERROR, ev);
        setTimeout(() => {
          this.initWebSocket();
        }, this.reconnectInterval);
      };
      this.webSocket.onmessage = ev => {
        this.emit(WebSocketEvents.MESSAGE, ev);
      };

      // Vue.prototype.$commandSocket = this.webSocket;
    } else {
      console.log("该环境不支持websocket");
    }
  }

  close() {
    if (this.webSocket) {
      clearInterval(this.heartbeat); // clear heartbeat
      this.webSocket.close();
    }
  }

  emit(eventName, data) {
    Vue.prototype.$eventHub.$emit(`${this.name}-${eventName}`, data);
  }

  addListener(eventName, callback) {
    Vue.prototype.$eventHub.$on(`${this.name}-${eventName}`, callback);
  }

  removeListener(eventName, callback) {
    Vue.prototype.$eventHub.$off(`${this.name}-${eventName}`, callback);
  }
}
