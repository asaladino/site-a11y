// @flow
import fs from "fs";
import path from "path";
import Option from "../Model/Option";
import Args from "../Model/Args";

export default class OptionsRepository {

    args: Args;
    option: ?Option;

    constructor(args: Args) {
        this.args = args;
    }

    getOption(): Option {
        if (!this.option) {
            let optionsFile = path.join(this.args.output.filename, 'options', this.args.getSiteName() + '.json');
            this.option = new Option(JSON.parse(fs.readFileSync(optionsFile).toString()));
        }
        return this.option;
    }
}
