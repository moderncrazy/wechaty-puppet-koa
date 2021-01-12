/**
 * Create by geekeryoung on 2020/3/30
 */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {PuppetMock} from 'wechaty-puppet-mock';
import {ContactGender, ContactPayload, ContactType, ScanStatus} from 'wechaty-puppet';

import router from './router/router';
import initUtil from './util/initUtil';
import notFound from './middleware/notFound';

class PuppetKoa extends PuppetMock {
  private readonly port: number;
  private readonly prefix: string;
  private readonly initFile: string;
  private loginData: ContactPayload;

  /**
   * initFile is json file
   * loginData not required if initFile exists
   * @param options = {port,prefix,?loginData,?initFile,...}
   */
  constructor(options: { port?: number, prefix?: string, loginData?: ContactPayload, initFile: string }) {
    const {port, prefix, loginData, initFile} = options;
    super(options);
    this.initFile = initFile;
    this.port = port || 3000;
    this.prefix = prefix || '/mock';
    this.loginData = loginData || {
      id: 'bot_id',
      name: 'bot',
      avatar: '',
      gender: ContactGender.Male,
      phone: ['13000000000'],
      type: ContactType.Corporation
    };

    const app = new Koa();

    app.use(notFound());

    app.use(bodyParser());

    router(app, this).then(() => {
      app.listen(this.port, () => {
        console.log(`PuppetKoa listen http://0.0.0.0:${this.port}${this.prefix}`);
      });
    });
  }

  async start() {
    this.state.on('pending');
    this.state.on(true);

    // import init file
    if (this.initFile) {
      let data = await initUtil.importInitFile(this.initFile, this);
      this.loginData = Object.assign(this.loginData, data.login);
    }

    // EventScanPayload
    this.mocker.scan('https://not-exist.com', ScanStatus.Confirmed);

    // EventLoginPayload
    this.mocker.login(this.mocker.ContactMock.load(this.loginData.id));
  }
}

export default PuppetKoa;
