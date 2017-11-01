const pa11y = require('pa11y');
const htmlReporter = require('pa11y/reporter/html');
const async = require('async');
const fs = require('fs');
// noinspection JSUnusedLocalSymbols
const Option = require('../Model/Option');
// noinspection JSUnusedLocalSymbols
const Truffler = require('truffler');

class Pa11yRepository {
    /**
     * @param option {Option}
     * @param env {string}
     */
    constructor(option, env) {
        this.option = option;
        this.env = env;
        this.pa11yTest = pa11y(this.option);
    }

    /**
     *
     * @returns {Truffler}
     */
    getPa11yTest() {
        return this.pa11yTest;
    }

    /**
     * Test a bunch of urls.
     * @param urls {Array.<Url>}
     */
    test(urls) {
        console.log("Queuing: " + urls.length);
        this.createFolder();
        var completed = 0;
        // noinspection JSUnresolvedFunction
        const q = async.queue((entry, callback) => {
            console.log("Complete: " + completed + " of " + urls.length + " | " + (completed/urls.length).toFixed(2) + "%");
            console.log("Testing: " + entry.url);
            this.getPa11yTest().run(entry.url + entry.fragment, (error, results) => {
                const html = htmlReporter.process(results, entry.url);
                fs.writeFile(this.folder + entry.name + '.html', html, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Finished: ' + this.folder + entry.name + '.html was saved!');
                    }
                    fs.writeFile(this.folder + entry.name + '.json', JSON.stringify(results), (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Finished: ' + this.folder + entry.name + '.json was saved!');
                        }
                        completed++;
                        callback();
                    });
                });
            });
        }, this.option.pa11yLogin.concurrency);

        // Add a function that is triggered when the queue
        // drains (it runs out of URLs to process)
        q.drain = function () {
            console.log('All done!');
        };

        // Lastly, push the URLs we wish to test onto the queue
        q.push(urls);
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