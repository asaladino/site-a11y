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
    getOption() {
        if (!this.option) {
            this.option = JSON.parse(fs.readFileSync('./config/options' + this.env + '.json').toString());
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