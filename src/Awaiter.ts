"use strict";

import {Dating} from "./Dating";

interface AwaiterImplementation {

    waitMs(number: number): Promise<void>;
}

export class RealAwaiter implements AwaiterImplementation {

    public waitMs(milliseconds: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(() => resolve(), milliseconds);
        });
    }
}

export class TestAwaiter implements AwaiterImplementation {
    // @ts-ignore
    private _waited: number|null = null;

    public resolve(): Promise<void> {
        return Promise.resolve();
    }

    public waitMs(number: number): Promise<void> {
        this._waited = number;
        return this.resolve();
    }

    public get waited(): number|null {
        return this._waited;
    }
}


const defaultImplementation = new RealAwaiter();

export class Awaiter {

    private static _implementation: AwaiterImplementation = defaultImplementation;

    public static milliseconds(milliseconds: number): Promise<void> {
        return this._implementation.waitMs(milliseconds)
    }

    public static seconds(seconds: number): Promise<void> {
        return this._implementation.waitMs(seconds * 1000)
    }

    public static till(time: Date): Promise<void> {
        const now = new Date();
        if (time < now) {
            return this.seconds(0);
        }

        return this.seconds(Dating.diffSeconds(time, now));
    }

    public static set implementation(value: AwaiterImplementation) {
        this._implementation = value;
    }

    public static restoreImplementation() {
        this._implementation = defaultImplementation;
    }
}

export function forMilliseconds(milliseconds: number): Promise<void> {
    return Awaiter.milliseconds(milliseconds);
}

export function forSeconds(seconds: number): Promise<void> {
    return Awaiter.seconds(seconds);
}

export function tillTime(time: Date): Promise<void> {
    return Awaiter.till(time);
}