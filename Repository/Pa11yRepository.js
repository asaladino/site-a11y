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
        let folder = './reports/' + this.env.substr(1) + '/';
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
        }
        // noinspection JSUnresolvedFunction
        const q = async.queue((entry, callback) => {
            console.log("Testing: " + entry.url);
            this.getPa11yTest().run(entry.url + entry.fragment, (error, results) => {
                const html = htmlReporter.process(results, entry.url);
                fs.writeFile(folder + entry.name + '.html', html, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Finished: ' + folder + entry.name + '.html was saved!');
                    }
                    fs.writeFile(folder + entry.name + '.json', JSON.stringify(results), (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Finished: ' + folder + entry.name + '.json was saved!');
                        }
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
}

module.exports = Pa11yRepository;