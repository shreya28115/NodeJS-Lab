const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const logsDir = path.join(__dirname, "..", "logs");
const LOG_FILE = path.join(logsDir, "server.log");

fs.mkdirSync(logsDir, { recursive: true });

class Logger extends EventEmitter {
    constructor() {
        super();

        this.on("request", (method, requestUrl) => {
            const line =
                `${new Date().toISOString()} ${method} ${requestUrl}\n`;

            console.log(line.trim());

            fs.appendFile(LOG_FILE, line, (error) => {
                if (error) {
                    this.emit("error", error);
                }
            });
        });

        this.on("error", (error) => {
            console.error("Logger error:", error.message);
        });
    }
}

const logger = new Logger();

module.exports = {
    logger,
    LOG_FILE
};