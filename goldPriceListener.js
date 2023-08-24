import { EventEmitter } from 'events';
import { GoldPriceSourceType } from './models/goldPriceSource.js';
import io from 'socket.io-client';

class GoldPriceListener extends EventEmitter {
  constructor(data) {
    super();
    this.id = data._id;
    this.latestPrice = null;
    this.socket = null;
    this.isConnected = false;
    this._data = data;
    this.errors = [];
    this.init();
  }

  async init() {
    switch (this._data.type) {
      case GoldPriceSourceType.HTTP:
        break;
      case GoldPriceSourceType.SOCKET:
        this.socketHandler();
        break;
      case GoldPriceSourceType.WS:
        break;
    }
  }

  socketHandler() {
    this.socket = io(this._data.url, {
      secure: true,
      transports: ['websocket'],
      rejectUnauthorized: false,
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('socket connected');
    });

    this.socket.on('connect_error', (error) => {
      console.log('error: ' + error);
      this.errors.push(error);
    });

    this.socket.on(this._data.response.eventName, async (payload) => {
      const data = await this.resolvePrice(payload);

      console.log(data);

      this.latestPrice = data;
      this.emit('data', data);
    });
  }

  async resolvePrice(payload) {
    if (typeof payload !== 'object') {
      payload = JSON.parse(payload);
    }

    const fn = new Function(
      `const payload = arguments[0];${this._data.response.fn}`
    );
    const data = await fn(payload);

    return data;
  }
}

export default GoldPriceListener;
