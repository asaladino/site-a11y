const pa11y = require('pa11y');
const async = require('async');
const htmlReporter = require('pa11y/reporter/html');
const fs = require('fs');

let args = process.argv.slice(2);
let env = '';
if (args.length > 0) {
    env = args[0];
}

const options = JSON.parse(fs.readFileSync('config/options' + env + '.json').toString());
const urlTests = JSON.parse(fs.readFileSync('config/urls' + env + '.json').toString())
    .slice(options.pa11yLoginOptions.startUrl, options.pa11yLoginOptions.endUrl);

const test = pa11y(options);

console.log("Queuing: " + urlTests.length);

// noinspection JSUnresolvedFunction
const q = async.queue(function (entry, callback) {
    console.log("Testing: " + entry.url);
    // noinspection JSUnresolvedFunction
    test.run(entry.url + entry.fragment, function (error, results) {
        const html = htmlReporter.process(results, entry.url);
        fs.writeFile("reports/" + entry.name + '.html', html, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Finished: ./reports/" + entry.name + " was saved!");
            }
            callback();
        });
    });
}, options.pa11yLoginOptions.concurrency);

// Add a function that is triggered when the queue
// drains (it runs out of URLs to process)
q.drain = function () {
    console.log('All done!');
};

// Lastly, push the URLs we wish to test onto the queue
q.push(urlTests);