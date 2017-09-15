const fs = require('fs');
// noinspection JSUnusedLocalSymbols
const Pa11yLogin = require('../Model/Pa11yLogin');
// noinspection JSUnusedLocalSymbols
const Url = require('../Model/Url');

class UrlsRepository {
    /**
     * @param pa11yLogin {Pa11yLogin}
     * @param env {string}
     */
    constructor(pa11yLogin, env) {
        this.pa11yLogin = pa11yLogin;
        this.env = env;
    }

    /**
     * Find urls for range specified in the Pa11yLogin
     * @returns {Array.<Url>|string|Buffer|Blob|ArrayBuffer}
     */
    findForRange() {
        return JSON.parse(fs.readFileSync('./config/urls' + this.env + '.json').toString())
            .slice(this.pa11yLogin.startUrl, this.pa11yLogin.endUrl);
    }
}

module.exports = UrlsRepository;