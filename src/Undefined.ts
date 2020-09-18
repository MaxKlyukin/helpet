"use strict";

class Undefined {
    // @ts-ignore
    private static _undefined;

    public static get value() {
        return this._undefined;
    }
}

export function isUndefined(value: any): value is undefined {
    return typeof value === 'undefined';
}

export const UNDEFINED = Undefined.value;