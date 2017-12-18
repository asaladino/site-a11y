const pa11y = require('pa11y');
const htmlReporter = require('pa11y-reporter-html');
const fs = require('fs');
const path = require("path");
// noinspection JSUnusedLocalSymbols
const Option = require('../Model/Option');
// noinspection JSUnusedLocalSymbols
const chalk = require('chalk');

class Pa11yRepository {
    /**
     * @param option {Option}
     * @param args {Args}
     */
    constructor(option, args) {
        this.option = option;
        this.args = args;
        /**
         * @type {Url}
         */
        this.currentUrl = null;
    }

    /**
     * Test a bunch of urls.
     * @param urlsToGet {Array.<Url>}
     * @param started {function}
     * @param updated  {function}
     */
    async test(urlsToGet, started = (found) => {
    }, updated = (delta, tokens) => {
    }) {
        this.createFolder();
        let completed = 0;
        let urls = urlsToGet.filter(url => {
            return !fs.existsSync(path.join(this.folder, url.name + '.json'));
        }).filter(url => {
            return !url.url.endsWith('.pdf')
        }).filter(url => {
            return url.errorCount < 3;
        });

        let total = urls.length;
        started(total);
        for (let url of urls) {
            this.currentUrl = url;
            const finalUrl = url.url + url.fragment;
            const results = await pa11y(finalUrl, this.option);
            const html = await htmlReporter.results(results);

            const htmlFile = path.join(this.folder, url.name + '.html');
            await fs.writeFile(htmlFile, html, (err) => {
                if (err) {
                    updated(0, {message: chalk.red(err)});
                } else {
                    updated(0, {message: chalk.green(url.name + '.html')});
                }
            });

            const jsonFile = path.join(this.folder, url.name + '.json');
            await fs.writeFile(jsonFile, JSON.stringify(results), (err) => {
                if (err) {
                    updated(0, {message: chalk.red(err)});
                } else {
                    updated(0, {message: chalk.green(url.name + '.json')});
                }
            });
            url.tested = true;
            completed++;
            updated(1, {message: finalUrl});
        }
    }

    /**
     * Create project folder.
     */
    createFolder() {
        this.folder = path.join(this.args.output.filename, this.args.getSiteName(), 'a11y');
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder)
        }
    }
}

module.exports = Pa11yRepository;