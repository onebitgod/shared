import { EventEmitter } from 'events';
import { redisPublisher, redisSubscriber } from './redis.js';

class ConfigProvider extends EventEmitter {
  constructor(isMaster = false) {
    super();
    this.isMaster = isMaster;
    this.config = null;
    this.data = {};
    this.init();
  }

  setConfig(config) {
    this.config = config;
  }

  async init() {
    await this.subscribe();
    await this.ping();
  }

  get(name) {
    if (!this.data[name]) throw new Error(`config: ${name} is not initialized`);

    return this.data[name];
  }

  async load(name) {
    for (const key in this.config) {
      if (name && key !== name) continue;
      this.data[key] = await this.config[key]();
    }

    this.publish();
  }

  static async refresh(name) {
    redisPublisher.publish('config:refresh', name);
  }

  async publish() {
    await redisPublisher.publish('config:change', JSON.stringify(this.data));
  }

  async subscribe() {
    if (this.isMaster) {
      redisSubscriber.subscribe(`config:refresh`, (name) => {
        this.load(name);
      });
    } else {
      redisSubscriber.subscribe('config:change', (data) => {
        this.data = JSON.parse(data);
      });
    }
  }

  async ping() {
    if (!this.isMaster) return;

    setInterval(() => {
      this.publish();
    }, 10000);
  }
}

export default ConfigProvider;
