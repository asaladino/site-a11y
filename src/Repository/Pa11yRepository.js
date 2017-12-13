const pa11y = require('pa11y');
const htmlReporter = require('pa11y-reporter-html');
const fs = require('fs');
// noinspection JSUnusedLocalSymbols
const Option = require('../Model/Option');
// noinspection JSUnusedLocalSymbols
const Truffler = require('truffler');
const chalk = require('chalk');

class Pa11yRepository {
    /**
     * @param option {Option}
     * @param env {string}
     */
    constructor(option, env) {
        this.option = option;
        this.env = env;
        /**
         * @type {Url}
         */
        this.currentUrl = null;
    }

    /**
     * Test a bunch of urls.
     * @param urlsToGet {Array.<Url>}
     */
    async test(urlsToGet) {
        this.createFolder();

        let completed = 0;

        let urls = urlsToGet.filter(url => {
            return !fs.existsSync(this.folder + url.name + '.html');
        }).filter(url => {
            return !url.url.endsWith('.pdf')
        }).filter(url => {
            return url.errorCount < 3;
        });

        let total = urls.length;
        for (let url of urls) {
            this.currentUrl = url;
            console.log('');
            console.log(chalk.blue("Completed: " + completed + " of " + total + " | " + ((completed / total) * 100).toFixed(2) + "%"));
            console.log(chalk.yellow("Testing: " + chalk.underline.bold(url.url)));
            const finalUrl = url.url + url.fragment;

            const results = await pa11y(finalUrl, this.option);
            const html = await htmlReporter.results(results);

            await fs.writeFile(this.folder + url.name + '.html', html, (err) => {
                if (err) {
                    console.log(chalk.red(err));
                } else {
                    console.log(chalk.green('Finished: ' + this.folder + url.name + '.html was saved!'));
                }
            });

            await fs.writeFile(this.folder + url.name + '.json', JSON.stringify(results), (err) => {
                if (err) {
                    console.log(chalk.red(err));
                } else {
                    console.log(chalk.green('Finished: ' + this.folder + url.name + '.json was saved!'));
                }
            });
            url.tested = true;
            completed++;
        }
    }

    /**
     * Create project folder.
     */
    createFolder() {
        this.folder = './reports/' + this.env.substr(1) + '/';
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder)
        }
    }

    /**
     * Generates an index.json file for the test.
     * @param urls {Array.<Url>}
     */
    index(urls) {
        this.createFolder();
        fs.writeFile(this.folder + 'index.json', JSON.stringify(urls), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(this.folder + 'index.json was created.');
            }
        });
    }
}

module.exports = Pa11yRepository;