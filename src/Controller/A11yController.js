const OptionsRepository = require('../Repository/OptionsRepository');
const UrlsRepository = require('../Repository/UrlsRepository');
const Pa11yRepository = require('../Repository/Pa11yRepository');

const ProgressUtility = require('../Utility/ProgressUtility');

class A11yController {
    constructor(args) {
        this.args = args;
    }

    start() {
        return new Promise((resolve, reject) => {
            this.args.output.doesFolderExist();
            // Load the option.
            let optionsRepository = new OptionsRepository(this.args);
            let option = optionsRepository.getOption();

            // Load the urls to test.
            let urlsRepository = new UrlsRepository(option, this.args);
            let urls = urlsRepository.findForRange();

            // Run tests.
            let pa11yRepository = new Pa11yRepository(option, this.args);

            test();
            function test() {
                let bar;
                pa11yRepository.test(urls, (count) => {
                    bar = ProgressUtility.build(count);
                }, (delta, tokens) =>{
                    bar.tick(delta, tokens);
                }).then(() => {
                    console.log('\nDone');
                    resolve();
                }).catch(exception => {
                    pa11yRepository.currentUrl.addError();
                    bar.tick(0, '!!!!!Exception!!!!');
                    test();
                });
            }
        });
    }
}

module.exports = A11yController;