import { ValuePair } from './types/pairValue';

let t = new ValuePair()

class Hash<K, V> {
    constructor() {

    }
    loseloseHashCode(key: K) {
        if (typeof key === 'number') {
            return key
        }
        let hash = 0
        let tableKey = String(key)
        for (let i = 0; i < tableKey.length; i ++) {
            hash += tableKey.charCodeAt(i)
        }
        return hash % 37
    }
    hasCode(key: K) {
        return this.loseloseHashCode(key)
    }
}

const h = new Hash<string, never>()