const fs = require('fs');
const path = require("path");

// noinspection JSUnusedLocalSymbols
const Option = require('../Model/Option');
const Args = require('../Model/Args');
// noinspection JSUnusedLocalSymbols
const Pa11yLogin = require('../Model/Pa11yLogin');

class OptionsRepository {

    /**
     * @param {Args} args
     */
    constructor(args) {
        this.args = args;
    }

    /**
     * @returns {Option}
     */
    getOption() {
        if (!this.option) {
            let optionsFile = path.join(this.args.output.filename, 'options', this.args.getSiteName() + '.json');
            this.option = JSON.parse(fs.readFileSync(optionsFile).toString());
        }
        return new Option(this.option);
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