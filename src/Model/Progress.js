// @flow
import Url from "./Url";

type ProgressLog = {
    total: number,
    progress: number,
    url: string
};

/**
 * Class for reporting the progress.
 */
export default class Progress {
    url: ?Url;
    total: number;
    progress: number;

    /**
     * Build a progress object.
     * @param url {Url|null} current url
     * @param total {number} total urls to process.
     */
    constructor(url: ?Url, total: number = 0) {
        this.url = url;
        this.total = total;
        this.progress = 0;
    }

    /**
     * Display something meaning full about the progress.
     */
    toString(): string {
        let url = this.url == null ? '' : this.url.url;
        return `${this.total} | ${this.progress} :: tested: ${url}`;
    }

    /**
     * Something to report in the logs.
     */
    toLog(): ProgressLog {
        return {
            total: this.total,
            progress: this.progress,
            url: this.url == null ? "" : this.url.url
        };
    }

    /**
     * Update the progress.
     * @param url {Url} that was just processed.
     */
    update(url: Url) {
        this.url = url;
        this.progress++;
    }
}
