"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _Args = _interopRequireDefault(require("../Model/Args"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Logger {
  constructor(args) {
    this.args = args;
    this.logsPath = this.getLogsPath();
    this.logger = _winston.default.createLogger({
      level: 'info',
      format: _winston.default.format.json(),
      transports: [new _winston.default.transports.File({
        filename: _path.default.join(this.logsPath, 'last_run.log')
      })]
    });
  }

  save(state) {
    return new Promise(resolve => {
      let file = _path.default.join(this.logsPath, 'state.json');

      _fs.default.writeFileSync(file, JSON.stringify(state));

      resolve();
    });
  }

  info(state) {
    this.logger.log('info', JSON.stringify(state));
  }

  report(state) {
    this.save(state);
    this.info(state);
  }

  getLogsPath() {
    let logsPathBase = _path.default.join(this.args.getProjectPath(), 'logs');

    if (!_fs.default.existsSync(logsPathBase)) {
      _fs.default.mkdirSync(logsPathBase);
    }

    let logsPath = _path.default.join(this.args.getProjectPath(), 'logs', 'a11y');

    if (!_fs.default.existsSync(logsPath)) {
      _fs.default.mkdirSync(logsPath);
    }

    return logsPath;
  }

}

exports.default = Logger;
//# sourceMappingURL=Logger.js.map