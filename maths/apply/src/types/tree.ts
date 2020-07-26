export type treeNodes = {
    key: number | string,
    left: treeNodes | null,
    right: treeNodes | null
}

export const serializeTreeValue = {
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
}

export const treeValue: treeNodes = {
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
}