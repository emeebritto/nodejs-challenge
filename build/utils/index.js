"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatListName = exports.count = exports.mergeDuplicate = void 0;
const mergeDuplicate = (list) => [...new Set(list)];
exports.mergeDuplicate = mergeDuplicate;
const count = (list, fn) => {
    let counter = 0;
    for (let i = 0; i < list.length; i++) {
        if (fn(list[i]))
            counter++;
    }
    return counter;
};
exports.count = count;
const formatListName = (listName) => {
    return listName.trim().replaceAll(/\s/g, ".").toLowerCase();
};
exports.formatListName = formatListName;
