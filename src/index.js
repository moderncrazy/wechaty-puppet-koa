/**
 * Create by geekeryoung on 2020/3/30
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const {PuppetMock} = require('wechaty-puppet-mock');

const router = require('./router/router');

class PuppetKoa extends PuppetMock {
  /**
   * @param options = {id,qrcode,status,data,...}
   */
  constructor(options) {
    const {id, qrcode, status, data} = options;
    super(options);
    this.id = id;
    this.data = data;
    this.qrcode = qrcode;
    this.status = status;
  }

  async start() {
    this.state.on('pending');
    this.state.on(true);

    this.emit('scan', this.qrcode || 'https://not-exist.com', this.status || 0, this.data || null);

    this.emit('login', this.id || 'login_user_id');

    const app = new Koa();

    app.use(bodyParser());

    await router(app, this);
  }
}

module.exports = {PuppetKoa};
