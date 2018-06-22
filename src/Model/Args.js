const FileDetails = require('./FileDetails');
const path = require('path');
const fs = require('fs');

class Args {
    constructor(params) {
        /**
         * Folder where the reports will be generated.
         * @type FileDetails
         */
        this.output = null;
        /**
         * Domain we will be scanning.
         * @type {string|*}
         */
        this.domain = null;
        /**
         * Should show lots of output.
         * @type {boolean}
         */
        this.verbose = false;
        /**
         * Use url from index else html from index will be used.
         * @type {boolean}
         */
        this.remote = false;

        Object.assign(this, params);
    }

    /**
     * Should show the help menu?
     * @return {boolean}
     */
    shouldShowHelp() {
        return this.hasOwnProperty('help') || !this.domain || !this.output;
    }

    /**
     * Get the site name for the slug of the domain.
     * @return {string}
     */
    getSiteName() {
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

module.exports = Args;