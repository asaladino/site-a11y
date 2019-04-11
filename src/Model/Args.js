// @flow
import FileDetails from "./FileDetails";
import path from "path";
import fs from "fs";

export default class Args {
    /**
     * Folder where the reports will be generated.
     */
    output: FileDetails;
    /**
     * Domain we will be scanning.
     */
    domain: string;
    /**
     * Should show lots of output.
     */
    verbose: boolean;
    /**
     * Use url from index else html from index will be used.
     * @type {boolean}
     */
    remote: boolean;
    constructor(params: any) {
        this.output = null;
        this.verbose = false;
        this.remote = false;
        Object.assign(this, params);
    }

    /**
     * Should show the help menu?
     */
    shouldShowHelp(): boolean {
        return this.hasOwnProperty('help') || !this.domain || !this.output;
    }

    /**
     * Get the site name for the slug of the domain.
     */
    getSiteName(): string {
        return this.domain.replace(/[.]/g, '_');
    }

    /**
     * Get the project folder which the output + the site name. Also, it will be created if it doesn't exist.
     * @returns {string} the project path.
     */
    getProjectPath() {
        let siteName = this.getSiteName();
        let projectPath = path.join(this.output.filename, siteName);
        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath);
        }
        return projectPath;
    }
}
