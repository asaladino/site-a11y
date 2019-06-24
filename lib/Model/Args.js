"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FileDetails = _interopRequireDefault(require("./FileDetails"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Args {
  /**
   * Folder where the reports will be generated.
   */

  /**
   * Domain we will be scanning.
   */

  /**
   * Should show lots of output.
   */

  /**
   * Use url from index else html from index will be used.
   * @type {boolean}
   */
  constructor(params) {
    this.output = null;
    this.verbose = false;
    this.remote = false;
    Object.assign(this, params);
  }
  /**
   * Should show the help menu?
   */


  shouldShowHelp() {
    return this.hasOwnProperty('help') || !this.domain || !this.output;
  }
  /**
   * Get the site name for the slug of the domain.
   */


  getSiteName() {
    return this.domain.replace(/[.]/g, '_');
  }
  /**
   * Get the project folder which the output + the site name. Also, it will be created if it doesn't exist.
   * @returns {string} the project path.
   */


  getProjectPath() {
    let siteName = this.getSiteName();

    let projectPath = _path.default.join(this.output.filename, siteName);

    if (!_fs.default.existsSync(projectPath)) {
      _fs.default.mkdirSync(projectPath);
    }

    return projectPath;
  }

}

exports.default = Args;
//# sourceMappingURL=Args.js.map