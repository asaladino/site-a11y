// Number of urls to check at a given time.
const concurrency = 1;
// Corresponds to the config option and url files to use.
const env = '-sample';
// What url do you want to start on?
const startUrl = 0;
// How many urls do you want after the start url?
const howManyUrls = 1;

const pa11y = require('pa11y');
const async = require('async');
const htmlReporter = require('pa11y/reporter/html');
const fs = require('fs');

const urlTests = JSON.parse(fs.readFileSync('config/urls' + env + '.json').toString()).slice(startUrl, howManyUrls);
const options = JSON.parse(fs.readFileSync('config/options' + env + '.json').toString());

const test = pa11y(options);

console.log("Queuing: " + urlTests.length);

// noinspection JSUnresolvedFunction
const q = async.queue(function (entry, callback) {
    console.log("Testing: " + entry.name);
    // noinspection JSUnresolvedFunction
    test.run(entry.url + entry.fragment, function (error, results) {
        const html = htmlReporter.process(results, entry.name);
        fs.writeFile("reports/" + entry.name + '.html', html, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Finished: The report for " + entry.name + " was saved!");
            }
            callback();
        });
    });
}, concurrency);

// Add a function that is triggered when the queue
// drains (it runs out of URLs to process)
q.drain = function () {
    console.log('All done!');
};

// Lastly, push the URLs we wish to test onto the queue
q.push(urlTests);