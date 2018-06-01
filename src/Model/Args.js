const FileDetails = require('./FileDetails');
const path = require('path');
const fs = require('fs');

class Args {
    constructor(params) {
        /**
         * @type FileDetails
         */
        this.output = null;
        /**
         * @type {string|*}
         */
        this.domain = null;

        this.verbose = false;

        Object.assign(this, params);
    }

    shouldShowHelp() {
        return this.hasOwnProperty('help') || !this.domain || !this.output;
    }

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