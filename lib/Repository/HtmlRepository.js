"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _fs=_interopRequireDefault(require("fs"));var _Url=_interopRequireDefault(require("../Model/Url"));var _path=_interopRequireDefault(require("path"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 * Save the url html to file.
 */class HtmlRepository{/**
     * Location to the html folder in the project.
     */ /**
     * Build a json url repo.
     */constructor(projectFolder){this.projectFolder=projectFolder}/**
     * Gets the full path to the html file.
     */file(url){return _path.default.join(this.getProjectsHtmlFolder(),url.name+".html")}/**
     * Creates the html folder in the project if it doesn't exist.
     * @returns {string} for the html folder.
     */getProjectsHtmlFolder(){let projectsPathHtml=_path.default.join(this.projectFolder,"html");if(!_fs.default.existsSync(projectsPathHtml)){_fs.default.mkdirSync(projectsPathHtml)}return projectsPathHtml}}exports.default=HtmlRepository;
//# sourceMappingURL=HtmlRepository.js.map