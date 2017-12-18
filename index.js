const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const OptionsRepository = require('./src/Repository/OptionsRepository');
const UrlsRepository = require('./src/Repository/UrlsRepository');
const Pa11yRepository = require('./src/Repository/Pa11yRepository');

const menu = require('./src/Model/Menu');
const Args = require('./src/Model/Args');
const ProgressUtility = require('./src/Utility/ProgressUtility');


let args = new Args(commandLineArgs(menu[1]['optionList']));

if (args.shouldShowHelp()) {
    console.log(getUsage(menu));
} else {
    // Load the option.
    let optionsRepository = new OptionsRepository(args);
    let option = optionsRepository.getOption();

    // Load the urls to test.
    let urlsRepository = new UrlsRepository(option, args);
    let urls = urlsRepository.findForRange();

    // Run tests.
    let pa11yRepository = new Pa11yRepository(option, args);

    test();
    function test() {
        let bar;
        pa11yRepository.test(urls, (count) => {
            console.log('Starting A11y Tests\n');
            bar = ProgressUtility.build(count);
        }, (delta, tokens) =>{
            bar.tick(delta, tokens);
        }).then(() => {
            console.log('\nA11y Tests Complete');
        }).catch(exception => {
            pa11yRepository.currentUrl.addError();
            console.log('!!!!!Exception!!!!');
            console.log(exception);
            test();
        });
    }
}