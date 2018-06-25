const OptionsRepository = require('../Repository/OptionsRepository');
const UrlsRepository = require('../Repository/UrlsRepository');
const Pa11yRepository = require('../Repository/Pa11yRepository');

class A11yController {
    constructor(args) {
        this.args = args;
        this.logger = new (require('../Utility/Logger'))(args);
    }

    start() {
        return new Promise((resolve, reject) => {
            this.args.output.doesFolderExist();
            // Load the option.
            let optionsRepository = new OptionsRepository(this.args);
            let option = optionsRepository.getOption();

            // Load the urls to test.
            let urlsRepository = new UrlsRepository(option, this.args);
            this.urls = urlsRepository.findAll();

            // Run tests.
            this.pa11yRepository = new Pa11yRepository(option, this.args);

            this.test(resolve);
        });
    }

    test(resolve) {
        this.pa11yRepository.test(this.urls, progress => {
            this.logger.report(progress.toLog());
            if (this.args.verbose) {
                console.log(progress.toString());
            }
        }, progress => {
            this.logger.report(progress.toLog());
            if (this.args.verbose) {
                console.log(progress.toString());
            }
        }).then(progress => {
            this.logger.report(progress.toLog());
            console.log(progress.toString());
            resolve();
        }).catch(exception => {
            this.pa11yRepository.currentUrl.addError();
            this.logger.report(exception);
            if (this.args.verbose) {
                console.log('!!!!!Exception!!!!');
            }
            this.test(resolve);
        });
    }
}

module.exports = A11yController;