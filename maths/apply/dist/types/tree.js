"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeValue = exports.serializeTreeValue = void 0;
exports.serializeTreeValue = {
    key: 1,
    left: {
        key: 2,
        left: null,
        right: {
            key: 3,
            left: null,
            right: null
        }
    },
    right: null
};
exports.treeValue = {
    key: 10,
    left: {
        key: 8,
        left: {
            key: 5,
            left: null,
            right: null
        },
        right: {
            key: 7,
            left: null,
            right: null
        }
    },
    right: {
        key: 8,
        left: {
            key: 7,
            left: null,
            right: null
        },
        right: {
            key: 5,
            left: null,
            right: null
        }
    }
};
