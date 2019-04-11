// @flow
import OptionsRepository from "../Repository/OptionsRepository";
import UrlsRepository from "../Repository/UrlsRepository";
import Pa11yRepository from "../Repository/Pa11yRepository";
import Logger from "../Utility/Logger";
import Args from "../Model/Args";
import Url from "../Model/Url";

export default class A11yController {
    args: Args;
    logger: Logger;
    urls: Url[];
    pa11yRepository: Pa11yRepository;

    constructor(args: Args) {
        this.args = args;
        this.logger = new Logger(args);
    }

    start(): Promise<void> {
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

    test(resolve: function = () => {}) {
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