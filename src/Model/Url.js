// @flow

export default class Url {
    name: string;
    url: string;
    fragment: string;
    errorCount: number;
    tested: boolean;

    constructor(name: string, url: string, fragment: string) {
        this.name = name;
        this.url = url;
        this.fragment = fragment;
        this.errorCount = 0;
        this.tested = false;
    }

    addError() {
        this.errorCount++;
    }
}

