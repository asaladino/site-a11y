"use strict";function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}const pa11y=require("pa11y");const fs=require("fs");const path=require("path");const Option=require("../Model/Option");const Progress=require("../Model/Progress");const HtmlRepository=require("../Repository/HtmlRepository");class Pa11yRepository{/**
     * @param option {Option}
     * @param args {Args}
     */constructor(option,args){/**
         * @type {Option}
         */this.option=option;this.args=args;/**
         * @type {Url}
         */this.currentUrl=null}/**
     * Test a bunch of urls.
     * @param urlsToGet {Array.<Url>}
     * @param started {function}
     * @param updated  {function}
     * @return {Progress}
     */test(urlsToGet){var _this=this,_arguments=arguments;return _asyncToGenerator(function*(){let started=_arguments.length>1&&_arguments[1]!==undefined?_arguments[1]:progress=>{};let updated=_arguments.length>2&&_arguments[2]!==undefined?_arguments[2]:progress=>{};_this.createFolder();let htmlRepository=new HtmlRepository(_this.args.getProjectPath());let urls=urlsToGet.filter(url=>{return!fs.existsSync(path.join(_this.folder,url.name+".json"))}).filter(url=>{return!url.url.endsWith(".pdf")}).filter(url=>{return url.errorCount<3});let progress=new Progress(null,urls.length);started(progress);for(let url of urls){let scanLocation=htmlRepository.file(url);if(_this.args.remote){scanLocation=url.url+url.fragment}// noinspection JSUnusedGlobalSymbols
_this.currentUrl=url;const results=yield pa11y(scanLocation,_this.option.a11y);const jsonFile=path.join(_this.folder,url.name+".json");yield fs.writeFile(jsonFile,JSON.stringify(results),err=>{});url.tested=true;progress.update(url);updated(progress)}return new Progress(null,urls.length)})()}/**
     * Create project folder.
     */createFolder(){this.folder=path.join(this.args.output.filename,this.args.getSiteName(),"a11y");if(!fs.existsSync(this.folder)){fs.mkdirSync(this.folder)}}}module.exports=Pa11yRepository;
//# sourceMappingURL=Pa11yRepository.js.map