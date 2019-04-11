// @flow
import fs from "fs";
import Url from "../Model/Url";
import path from "path";

/**
 * Save the url html to file.
 */
export default class HtmlRepository {
    /**
     * Location to the html folder in the project.
     */
    projectFolder: string;

    /**
     * Build a json url repo.
     */
    constructor(projectFolder: string) {
        this.projectFolder = projectFolder;
    }

    /**
     * Gets the full path to the html file.
     */
    file(url: Url): string {
        return path.join(this.getProjectsHtmlFolder(), url.name + '.html');
    }

    /**
     * Creates the html folder in the project if it doesn't exist.
     * @returns {string} for the html folder.
     */
    getProjectsHtmlFolder(): string {
        let projectsPathHtml = path.join(this.projectFolder, 'html');
        if (!fs.existsSync(projectsPathHtml)) {
            fs.mkdirSync(projectsPathHtml);
        }
        return projectsPathHtml;
    }
}