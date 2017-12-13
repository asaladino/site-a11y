const ArgsRepository = require('./src/Repository/ArgsRepository');
const OptionsRepository = require('./src/Repository/OptionsRepository');
const UrlsRepository = require('./src/Repository/UrlsRepository');
const Pa11yRepository = require('./src/Repository/Pa11yRepository');

// Get the environment from the commandline args.
let env = ArgsRepository.getEnvironment();

// Load the option.
let optionsRepository = new OptionsRepository(env);
let option = optionsRepository.getOption();
let pa11yLogin = optionsRepository.getPa11yLogin();
// Load the urls to test.
let urlsRepository = new UrlsRepository(pa11yLogin, env);
let urls = urlsRepository.findForRange();

// Run tests.
let pa11yRepository = new Pa11yRepository(option, env);
test();
function test() {
    pa11yRepository.test(urls).then(() => {
        pa11yRepository.index(urls);
    }).catch(exception => {
        pa11yRepository.currentUrl.addError();
        console.log('!!!!!Exception!!!!');
        console.log(exception);
        test();
    });
}