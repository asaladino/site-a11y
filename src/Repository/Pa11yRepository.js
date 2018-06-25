const pa11y = require('pa11y');
const fs = require('fs');
const path = require("path");
const Option = require('../Model/Option');
const Progress = require('../Model/Progress');
const HtmlRepository = require('../Repository/HtmlRepository');

class Pa11yRepository {
    /**
     * @param option {Option}
     * @param args {Args}
     */
    constructor(option, args) {
        /**
         * @type {Option}
         */
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
     * @return {Progress}
     */
    async test(urlsToGet, started = (progress) => {}, updated = (progress) => {}) {
        this.createFolder();
        let htmlRepository = new HtmlRepository(this.args.getProjectPath());
        let urls = urlsToGet.filter(url => {
            return !fs.existsSync(path.join(this.folder, url.name + '.json'));
        }).filter(url => {
            return !url.url.endsWith('.pdf')
        }).filter(url => {
            return url.errorCount < 3;
        });

        let progress = new Progress(null, urls.length);
        started(progress);
        for (let url of urls) {
            let scanLocation = htmlRepository.file(url);
            if(this.args.remote) {
                scanLocation = url.url + url.fragment;
            }
            // noinspection JSUnusedGlobalSymbols
            this.currentUrl = url;
            const results = await pa11y(scanLocation, this.option.a11y);
            const jsonFile = path.join(this.folder, url.name + '.json');
            await fs.writeFile(jsonFile, JSON.stringify(results), (err) => {});
            url.tested = true;
            progress.update(url);
            updated(progress);
        }
        return new Progress(null, urls.length);
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