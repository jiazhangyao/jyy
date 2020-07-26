"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pairValue_1 = require("./types/pairValue");
let t = new pairValue_1.ValuePair();
class Hash {
    constructor() {
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        let hash = 0;
        let tableKey = String(key);
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    hasCode(key) {
        return this.loseloseHashCode(key);
    }
}
const h = new Hash();
