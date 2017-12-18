const fs = require('fs');
// noinspection JSUnusedLocalSymbols
const Pa11yLogin = require('../Model/Pa11yLogin');
// noinspection JSUnusedLocalSymbols
const Url = require('../Model/Url');
const Args = require('../Model/Args');
const Option = require('../Model/Option');
const path = require("path");

class UrlsRepository {
    /**
     * @param option {Option}
     * @param args {Args}
     */
    constructor(option, args) {
        this.option = option;
        this.args = args;
    }

    /**
     * Find urls for range specified in the Pa11yLogin
     * @returns {Array.<Url>|string|Buffer|Blob|ArrayBuffer}
     */
    findForRange() {
        let urlsFile = path.join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
        return JSON.parse(fs.readFileSync(urlsFile).toString())
            .slice(this.option.pa11yLogin.startUrl, this.option.pa11yLogin.endUrl)
            .map(entry => {
                return new Url(entry.name, entry.url, entry.fragment);
            });
    }
}

module.exports = UrlsRepository;