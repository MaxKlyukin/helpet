"use strict";

// @ts-ignore
const isWindows = typeof process !== 'undefined' && 'win32' === process.platform;

export class System {

    public static readonly EOL = isWindows ? '\r\n' : '\n';

    // @ts-ignore
    public static readonly isNode = (typeof process !== 'undefined') && (typeof process.release !== 'undefined') && (process.release.name === 'node');
}