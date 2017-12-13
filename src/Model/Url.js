class Url {
    constructor(name, url, fragment) {
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

module.exports = Url;