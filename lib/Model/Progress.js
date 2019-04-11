"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _Url=_interopRequireDefault(require("./Url"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 * Class for reporting the progress.
 */class Progress{/**
     * Build a progress object.
     * @param url {Url|null} current url
     * @param total {number} total urls to process.
     */constructor(url){let total=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;this.url=url;this.total=total;this.progress=0}/**
     * Display something meaning full about the progress.
     */toString(){let url=this.url==null?"":this.url.url;return"".concat(this.total," | ").concat(this.progress," :: tested: ").concat(url)}/**
     * Something to report in the logs.
     */toLog(){return{total:this.total,progress:this.progress,url:this.url==null?"":this.url.url}}/**
     * Update the progress.
     * @param url {Url} that was just processed.
     */update(url){this.url=url;this.progress++}}exports.default=Progress;
//# sourceMappingURL=Progress.js.map