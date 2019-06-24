// @flow
import pa11y from "pa11y";
import fs from "fs";
import path from "path";
import Option from "../Model/Option";
import Args from "../Model/Args";
import Progress from "../Model/Progress";
import HtmlRepository from "../Repository/HtmlRepository";
import Url from "../Model/Url";

export default class Pa11yRepository {
    option: Option;
    args: Args;
    currentUrl: Url;
    folder: string;

    constructor(option: Option, args: Args) {
        this.option = option;
        this.args = args;
    }

    /**
     * Test a bunch of urls.
     */
    async test(urlsToGet: Url[], started: (progress: Progress) => void, updated: (progress: Progress) => void) {
        this.createFolder();
        let htmlRepository = new HtmlRepository(this.args.getProjectPath());
        let urls = urlsToGet.filter(url => {
            return !fs.existsSync(path.join(this.folder, url.name + '.json'));
        }).filter(url => {
            return !url.url.endsWith('.pdf')
        }).filter(url => {
            return url.errorCount < 3;
        });

        let progress = new Progress(null, urls.length);
        started(progress);
        for (let url of urls) {
            let scanLocation = htmlRepository.file(url);
            if (this.args.remote) {
                let {fragment} = url;
                scanLocation = url.url + (fragment ? fragment : '');
            }
            this.currentUrl = url;
            const results = await pa11y(scanLocation, this.option.a11y);
            const jsonFile = path.join(this.folder, url.name + '.json');
            await fs.writeFileSync(jsonFile, JSON.stringify(results));
            url.tested = true;
            progress.update(url);
            updated(progress);
        }
        return new Progress(null, urls.length);
    }

    /**
     * Create project folder.
     */
    createFolder() {
        this.folder = path.join(this.args.output.filename, this.args.getSiteName(), 'a11y');
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder)
        }
    }
}