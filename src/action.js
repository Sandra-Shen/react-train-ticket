export function createAdd(payload) {
    return {
        type:'add',
        payload: payload
    }
}
export function createSet(payload) {
    return {
        type:'set',
        payload: payload
    }
}
export function createRemove(payload) {
    return {
        type:'remove',
        payload: payload
    }
}
export function createToggle(payload) {
    return {
        type:'toggle',
        payload: payload
    }
}