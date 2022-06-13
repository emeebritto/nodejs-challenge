"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parser_1 = __importDefault(require("csv-parser"));
const node_fs_1 = __importDefault(require("node:fs"));
class CSVReader {
    static loadCSV(path) {
        return new Promise((resolve, reject) => {
            const results = [];
            try {
                node_fs_1.default.createReadStream(path)
                    .pipe((0, csv_parser_1.default)())
                    .on('data', (data) => results.push(data))
                    .on('end', () => {
                    resolve(results);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.default = CSVReader;
