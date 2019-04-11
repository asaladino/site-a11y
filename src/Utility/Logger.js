// @flow
import winston from "winston";
import Args from "../Model/Args";
import path from "path";
import fs from "fs";

export default class Logger {
    args: Args;
    logsPath: string;
    logger: any;

    constructor(args: Args) {
        this.args = args;
        this.logsPath = this.getLogsPath();
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({filename: path.join(this.logsPath, 'last_run.log')})
            ]
        });
    }

    save(state: any): Promise<any> {
        return new Promise((resolve) => {
            let file = path.join(this.logsPath, 'state.json');
            fs.writeFileSync(file, JSON.stringify(state));
            resolve();
        });
    }

    info(state: any) {
        this.logger.log('info', JSON.stringify(state));
    }

    report(state: any) {
        this.save(state);
        this.info(state);
    }

    getLogsPath(): string {
        let logsPathBase = path.join(this.args.getProjectPath(), 'logs');
        if (!fs.existsSync(logsPathBase)) {
            fs.mkdirSync(logsPathBase);
        }

        let logsPath = path.join(this.args.getProjectPath(), 'logs', 'a11y');
        if (!fs.existsSync(logsPath)) {
            fs.mkdirSync(logsPath);
        }
        return logsPath;
    }

}