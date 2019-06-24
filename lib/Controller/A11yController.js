"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _OptionsRepository = _interopRequireDefault(require("../Repository/OptionsRepository"));

var _UrlsRepository = _interopRequireDefault(require("../Repository/UrlsRepository"));

var _Pa11yRepository = _interopRequireDefault(require("../Repository/Pa11yRepository"));

var _Logger = _interopRequireDefault(require("../Utility/Logger"));

var _Args = _interopRequireDefault(require("../Model/Args"));

var _Url = _interopRequireDefault(require("../Model/Url"));

var _Progress = _interopRequireDefault(require("../Model/Progress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// noinspection JSUnusedGlobalSymbols
class A11yController {
  constructor(args) {
    this.args = args;
    this.logger = new _Logger.default(args);
  }

  start() {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (event, progress) => {};
    return new Promise((resolve, reject) => {
      this.args.output.doesFolderExist(); // Load the option.

      let optionsRepository = new _OptionsRepository.default(this.args);
      let option = optionsRepository.getOption(); // Load the urls to test.

      let urlsRepository = new _UrlsRepository.default(option, this.args);
      this.urls = urlsRepository.findAll(); // Run tests.

      this.pa11yRepository = new _Pa11yRepository.default(option, this.args);
      this.test(callback, resolve);
    });
  }

  test() {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (event, progress) => {};
    let resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
    this.pa11yRepository.test(this.urls, progress => {
      callback('start', progress);
      this.logger.report(progress.toLog());

      if (this.args.verbose) {
        console.log(progress.toString());
      }
    }, progress => {
      callback('progress', progress);
      this.logger.report(progress.toLog());

      if (this.args.verbose) {
        console.log(progress.toString());
      }
    }).then(progress => {
      callback('complete', progress);
      this.logger.report(progress.toLog());

      if (this.args.verbose) {
        console.log(progress.toString());
      }

      resolve();
    }).catch(exception => {
      callback('exception', exception);
      this.pa11yRepository.currentUrl.addError();
      this.logger.report(exception);

      if (this.args.verbose) {
        console.log('!!!!!Exception!!!!');
      }

      this.test(resolve);
    });
  }

}

exports.default = A11yController;
//# sourceMappingURL=A11yController.js.map