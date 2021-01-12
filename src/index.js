"use strict";
/**
 * Create by geekeryoung on 2020/3/30
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = PuppetKoa;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUVILHNEQUFzQjtBQUN0Qiw0RUFBd0M7QUFDeEMsNkRBQStDO0FBQy9DLG1EQUFzRjtBQUV0RixxRUFBcUM7QUFDckMsdUVBQXVDO0FBQ3ZDLDZFQUE2QztBQUU3QyxNQUFNLFNBQVUsU0FBUSxnQ0FBVTtJQU1oQzs7OztPQUlHO0lBQ0gsWUFBWSxPQUF5RjtRQUNuRyxNQUFNLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3BELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUk7WUFDNUIsRUFBRSxFQUFFLFFBQVE7WUFDWixJQUFJLEVBQUUsS0FBSztZQUNYLE1BQU0sRUFBRSxFQUFFO1lBQ1YsTUFBTSxFQUFFLDhCQUFhLENBQUMsSUFBSTtZQUMxQixLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDdEIsSUFBSSxFQUFFLDRCQUFXLENBQUMsV0FBVztTQUM5QixDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLEVBQUUsQ0FBQztRQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRXBCLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0JBQVUsRUFBRSxDQUFDLENBQUM7UUFFdEIsZ0JBQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMxQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUs7UUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQixtQkFBbUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksSUFBSSxHQUFHLE1BQU0sa0JBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsMkJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVoRSxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxTQUFTLENBQUMifQ==