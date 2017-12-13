const fs = require('fs');
// noinspection JSUnusedLocalSymbols
const Option = require('../Model/Option');
// noinspection JSUnusedLocalSymbols
const Pa11yLogin = require('../Model/Pa11yLogin');

class OptionsRepository {
    constructor(env) {
        this.env = env;
    }

    /**
     * @returns {Option}
     */
    getOption(settings = {}) {
        if (!this.option) {
            this.option = JSON.parse(fs.readFileSync('./config/options' + this.env + '.json').toString());
        }
        if (settings.debug) {
            this.option.log = {
                debug: console.log.bind(console),
                error: console.error.bind(console),
                info: console.info.bind(console)
            };
        }
        return this.option;
    }

    /**
     *
     * @returns {Pa11yLogin}
     */
    getPa11yLogin() {
        return this.getOption().pa11yLogin;
    }

}

module.exports = OptionsRepository;