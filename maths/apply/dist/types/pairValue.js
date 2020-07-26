"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuePair = void 0;
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}
exports.ValuePair = ValuePair;
