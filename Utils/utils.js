"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestData = getTestData;
exports.getTotalRecords = getTotalRecords;
const sync_1 = require("csv-parse/sync");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getTestData(filterObj, filePath) {
    const actualRecords = (0, sync_1.parse)(fs_1.default.readFileSync(path_1.default.join(filePath)), {
        columns: true,
        skip_empty_lines: true,
        delimiter: ',',
        escape: '\\'
    });
    var records = [];
    for (const record of actualRecords) {
        let goRecord = true;
        filterObj.forEach(function (value, key) {
            if (record[key] == value && goRecord == true) {
                goRecord = true;
            }
            else {
                goRecord = false;
            }
        });
        if (goRecord == true) {
            records.push(record);
        }
    }
    return records;
}
function getTotalRecords(filePath) {
    const actualRecords = (0, sync_1.parse)(fs_1.default.readFileSync(path_1.default.join(filePath)), {
        columns: true,
        skip_empty_lines: true,
        delimiter: ',',
        escape: '\\',
        info: true
    });
    return actualRecords;
}
//# sourceMappingURL=utils.js.map