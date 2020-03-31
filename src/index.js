/**
 * Create by geekeryoung on 2020/3/30
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const {PuppetMock} = require('wechaty-puppet-mock');

const router = require('./router/router');
const notFound = require('./middleware/notFound');

class PuppetKoa extends PuppetMock {
  /**
   * @param options = {id,qrcode,status,data,port,prefix,...}
   */
  constructor(options) {
    const {id, qrcode, status, data, port, prefix} = options;
    super(options);
    this.id = id || 'login_user_id';
    this.port = port || 3000;
    this.data = data || null;
    this.prefix = prefix || '/mock';
    this.qrcode = qrcode || 'https://not-exist.com';
    this.status = status || 0;
  }

  async start() {
    this.state.on('pending');
    this.state.on(true);

    this.emit('scan', this.qrcode, this.status, this.data);

    this.emit('login', this.id);

    const app = new Koa();

    app.use(notFound());

    app.use(bodyParser());

    await router(app, this);

    app.listen(this.port, () => {
      console.log(`PuppetKoa listen http://0.0.0.0:${this.port}`);
    })
  }
}

module.exports = {PuppetKoa};
