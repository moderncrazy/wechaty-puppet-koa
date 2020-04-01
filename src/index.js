/**
 * Create by geekeryoung on 2020/3/30
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const {PuppetMock} = require('wechaty-puppet-mock');

const router = require('./router/router');
const initUtil = require('./util/initUtil');
const notFound = require('./middleware/notFound');

class PuppetKoa extends PuppetMock {
  /**
   * initFile is json file
   * loginData not required if initFile exists
   * @param options = {port,prefix,?loginData,?initFile,...}
   */
  constructor(options) {
    const {port, prefix, loginData, initFile} = options;
    super(options);
    this.initFile = initFile;
    this.port = port || 3000;
    this.prefix = prefix || '/mock';
    this.loginData = loginData || {id: 'bot_id', status: 0, qrcode: 'https://not-exist.com'};
  }

  async start() {
    this.state.on('pending');
    this.state.on(true);

    // import init file
    if (this.initFile) {
      let data = await initUtil.importInitFile(this.initFile, this);
      this.loginData = Object.assign(this.loginData, data.login);
    }

    this.emit('scan', this.loginData.qrcode, this.loginData.status, this.loginData.data);

    this.emit('login', this.loginData.id);

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
