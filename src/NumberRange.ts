"use strict";

import {List} from "./type/List";

export class NumberRange {
    private readonly _start: number;
    private readonly _end: number;

    constructor(start: number, end: number) {
        if (start > end) {
            throw new NumberRangeException("Start of the range should be smaller than the end of it");
        }

        this._start = start;
        this._end = end;
    }

    public get start(): number {
        return this._start;
    }

    public get end(): number {
        return this._end;
    }

    public get isSingular(): boolean {
        return this._start == this._end;
    }

    public* numbers(): Iterable<number> {
        for (let number = this._start; number <= this._end; number++) {
            yield number;
        }
    }

    public static fromString(range: string): NumberRange {
        const placesRange = range.split("-").map(place => parseInt(place));

        if (placesRange.length >= 2) {
            return new NumberRange(placesRange[0], placesRange[1]);
        }

        return new NumberRange(placesRange[0], placesRange[0]);
    }

    public toString(compact: boolean = false): string {
        if (compact && this.isSingular) {
            return `${this._start}`;
        }

        return `${this._start}-${this._end}`;
    }

    public toList(): List<number> {
        return List.from(this.numbers());
    }

    * [Symbol.iterator]() {
        yield* this.numbers();
    }
}

export function range(n: number): NumberRange {
    return new NumberRange(0, n - 1);
}

export class NumberRangeException extends Error {
}