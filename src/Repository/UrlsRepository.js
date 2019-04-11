// @flow
import fs from "fs";
import Url from "../Model/Url";
import Args from "../Model/Args";
import Option from "../Model/Option";
import path from "path";

export default class UrlsRepository {
    option: Option;
    args: Args;

    constructor(option: Option, args: Args) {
        this.option = option;
        this.args = args;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Find urls for range specified in the Pa11yLogin
     */
    findForRange(): Url[] {
        let urlsFile = path.join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
        let startUrl = 0;
        let endUrl = -1;
        if (this.option.hasOwnProperty('a11y') && this.option.a11y.hasOwnProperty('pa11yLogin')) {
            if (this.option.a11y.pa11yLogin.hasOwnProperty('startUrl')) {
                startUrl = this.option.a11y.pa11yLogin.startUrl;
            }
            if (this.option.a11y.pa11yLogin.hasOwnProperty('endUrl')) {
                endUrl = this.option.a11y.pa11yLogin.endUrl;
            }
        }
        return JSON.parse(fs.readFileSync(urlsFile).toString())
            .slice(startUrl, endUrl)
            .map(entry => {
                return new Url(entry.name, entry.url, entry.fragment);
            });
    }


    /**
     * Find urls for range specified in the Pa11yLogin
     */
    findAll(): Url[] {
        let urlsFile = path.join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
        return JSON.parse(fs.readFileSync(urlsFile).toString())
            .map(entry => {
                return new Url(entry.name, entry.url, entry.fragment);
            });
    }
}