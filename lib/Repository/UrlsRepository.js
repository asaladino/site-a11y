"use strict";const fs=require("fs");const Url=require("../Model/Url");const Args=require("../Model/Args");const Option=require("../Model/Option");const path=require("path");class UrlsRepository{/**
     * @param option {Option}
     * @param args {Args}
     */constructor(option,args){this.option=option;this.args=args}/**
     * Find urls for range specified in the Pa11yLogin
     * @returns {[Url]}
     */findForRange(){let urlsFile=path.join(this.args.output.filename,this.args.getSiteName(),"urls","urls.json");let startUrl=0;let endUrl=-1;if(this.option.hasOwnProperty("a11y")&&this.option.a11y.hasOwnProperty("pa11yLogin")){if(this.option.a11y.pa11yLogin.hasOwnProperty("startUrl")){startUrl=this.option.a11y.pa11yLogin.startUrl}if(this.option.a11y.pa11yLogin.hasOwnProperty("endUrl")){endUrl=this.option.a11y.pa11yLogin.endUrl}}return JSON.parse(fs.readFileSync(urlsFile).toString()).slice(startUrl,endUrl).map(entry=>{return new Url(entry.name,entry.url,entry.fragment)})}/**
     * Find urls for range specified in the Pa11yLogin
     * @returns {[Url]}
     */findAll(){let urlsFile=path.join(this.args.output.filename,this.args.getSiteName(),"urls","urls.json");return JSON.parse(fs.readFileSync(urlsFile).toString()).map(entry=>{return new Url(entry.name,entry.url,entry.fragment)})}}module.exports=UrlsRepository;
//# sourceMappingURL=UrlsRepository.js.map