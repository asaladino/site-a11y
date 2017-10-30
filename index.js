const ArgsRepository = require('./Repository/ArgsRepository');
const OptionsRepository = require('./Repository/OptionsRepository');
const UrlsRepository = require('./Repository/UrlsRepository');
const Pa11yRepository = require('./Repository/Pa11yRepository');

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
pa11yRepository.test(urls);
pa11yRepository.index(urls);