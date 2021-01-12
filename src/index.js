"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppetKoa = void 0;
const tslib_1 = require("tslib");
const koa_1 = tslib_1.__importDefault(require("koa"));
const koa_bodyparser_1 = tslib_1.__importDefault(require("koa-bodyparser"));
const wechaty_puppet_mock_1 = require("wechaty-puppet-mock");
const wechaty_puppet_1 = require("wechaty-puppet");
const router_1 = tslib_1.__importDefault(require("./router/router"));
const initUtil_1 = tslib_1.__importDefault(require("./util/initUtil"));
const notFound_1 = tslib_1.__importDefault(require("./middleware/notFound"));
class PuppetKoa extends wechaty_puppet_mock_1.PuppetMock {
    /**
     * initFile is json file
     * loginData not required if initFile exists
     * @param options = {port,prefix,?loginData,?initFile,...}
     */
    constructor(options) {
        const { port, prefix, loginData, initFile } = options;
        super(options);
        this.initFile = initFile;
        this.port = port || 3000;
        this.prefix = prefix || '/mock';
        this.loginData = loginData || {
            id: 'bot_id',
            name: 'bot',
            avatar: '',
            gender: wechaty_puppet_1.ContactGender.Male,
            phone: ['13000000000'],
            type: wechaty_puppet_1.ContactType.Corporation
        };
        const app = new koa_1.default();
        app.use(notFound_1.default());
        app.use(koa_bodyparser_1.default());
        router_1.default(app, this).then(() => {
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
            let data = await initUtil_1.default.importInitFile(this.initFile, this);
            this.loginData = Object.assign(this.loginData, data.login);
        }
        // EventScanPayload
        this.mocker.scan('https://not-exist.com', wechaty_puppet_1.ScanStatus.Confirmed);
        // EventLoginPayload
        this.mocker.login(this.mocker.ContactMock.load(this.loginData.id));
    }
}
exports.PuppetKoa = PuppetKoa;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7QUFFSCxzREFBc0I7QUFDdEIsNEVBQXdDO0FBQ3hDLDZEQUErQztBQUMvQyxtREFBc0Y7QUFFdEYscUVBQXFDO0FBQ3JDLHVFQUF1QztBQUN2Qyw2RUFBNkM7QUFFN0MsTUFBYSxTQUFVLFNBQVEsZ0NBQVU7SUFNdkM7Ozs7T0FJRztJQUNILFlBQVksT0FBeUY7UUFDbkcsTUFBTSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQztRQUNwRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxJQUFJO1lBQzVCLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLEtBQUs7WUFDWCxNQUFNLEVBQUUsRUFBRTtZQUNWLE1BQU0sRUFBRSw4QkFBYSxDQUFDLElBQUk7WUFDMUIsS0FBSyxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ3RCLElBQUksRUFBRSw0QkFBVyxDQUFDLFdBQVc7U0FDOUIsQ0FBQztRQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUM7UUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxFQUFFLENBQUMsQ0FBQztRQUVwQixHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXRCLGdCQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEIsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLElBQUksR0FBRyxNQUFNLGtCQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVEO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLDJCQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFaEUsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNGO0FBdkRELDhCQXVEQyJ9