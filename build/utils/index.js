"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = exports.mergeValues = void 0;
const mergeValues = (list) => [...new Set(list)];
exports.mergeValues = mergeValues;
const count = (list, fn) => {
    let counter = 0;
    for (let i = 0; i < list.length; i++) {
        if (fn(list[i]))
            counter++;
    }
    return counter;
};
exports.count = count;
