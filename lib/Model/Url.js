"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

exports.default = Url;
//# sourceMappingURL=Url.js.map