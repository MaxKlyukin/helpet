"use strict";

import {isUndefined, UNDEFINED} from "../Undefined";

export function tuple(...values: any[]): Tuple {
    if (values.length == 0) {
        return new Tuple0();
    } else if (values.length == 1) {
        return new Tuple1(values[0]);
    } else if (values.length == 2) {
        return new Tuple2(values[0], values[1]);
    }

    throw new NonexistentTupleException(`No tuple for ${values.length} arguments`);
}

export interface Tuple {

    size: number;

    presentSize: number;

    isEmpty(): boolean;

    isFull(): boolean;

    has(n: number): boolean;

    get(n: number): any;

    keys(): Iterable<number>;

    values(): Iterable<any>;

    entries(): Iterable<[number, any]>;

    presentKeys(): Iterable<number>;

    presentValues(): Iterable<any>;

    presentEntries(): Iterable<[number, any]>;

    toString(): string;

    toArray(): any[];
}

export class Tuple0 implements Tuple {

    public get size() {
        return 0;
    }

    public get presentSize() {
        return 0;
    }

    public isEmpty() {
        return true;
    }

    public isFull() {
        return true;
    }

    public has(n: number): boolean {
        throw new InvalidIndexException();
    }

    public get(n: number): any {
        throw new InvalidIndexException();
    }

    public * keys(): Iterable<number> {
    }

    public * values(): Iterable<any> {
    }

    public * entries(): Iterable<[number, any]> {
    }

    public * presentKeys(): Iterable<number> {
    }

    public * presentValues(): Iterable<any> {
    }

    public * presentEntries(): Iterable<[number, any]> {
    }

    public toString() {
        return `()`;
    }

    public toArray(): any[] {
        return [];
    }
}

export class Tuple1<T>  implements Tuple {

    private _first: T;

    constructor(first: T = UNDEFINED) {
        this._first = first;
    }

    public get size() {
        return 1;
    }

    public get presentSize() {
        return this.hasFirst() ? 1 : 0;
    }

    public get first() {
        return this._first;
    }

    public get _1() {
        return this._first;
    }

    public hasFirst(): boolean {
        return !isUndefined(this.first);
    }

    public isEmpty() {
        return !this.hasFirst();
    }

    public isFull() {
        return this.hasFirst();
    }

    public has(n: number): boolean {
        if (n == 1) {
            return this.hasFirst();
        }

        throw new InvalidIndexException();
    }

    public get(n: number): T {
        if (n == 1) {
            return this.first;
        }

        throw new InvalidIndexException();
    }

    public * keys(): Iterable<number> {
        yield 1;
    }

    public * values(): Iterable<T> {
        yield this.first;
    }

    public * entries(): Iterable<[number, T]> {
        yield [1, this.first];
    }

    public * presentKeys(): Iterable<number> {
        if (this.hasFirst()) {
            yield 1;
        }
    }

    public * presentValues(): Iterable<T> {
        if (this.hasFirst()) {
            yield this.first;
        }
    }

    public * presentEntries(): Iterable<[number, T]> {
        if (this.hasFirst()) {
            yield [1, this.first];
        }
    }

    public toString() {
        return `(${this.first})`;
    }

    public toArray(): [T] {
        return [this.first];
    }
}

export class Tuple2<T1, T2> implements Tuple {

    protected _first: T1;
    protected _second: T2;

    constructor(first: T1 = UNDEFINED, second: T2 = UNDEFINED) {
        this._first = first;
        this._second = second;
    }

    public get size() {
        return 2;
    }

    public get presentSize() {
        return (this.hasFirst() ? 1 : 0)
            + (this.hasSecond() ? 1 : 0);
    }

    public get first() {
        return this._first;
    }

    public get _1() {
        return this._first;
    }

    public get second() {
        return this._second;
    }

    public get _2() {
        return this._second;
    }

    public withFirst(first: T1): Tuple2<T1, T2> {
        return new Tuple2(first, this._second);
    }

    public withSecond(second: T2): Tuple2<T1, T2> {
        return new Tuple2(this._first, second);
    }

    public hasFirst(): boolean {
        return !isUndefined(this.first);
    }

    public hasSecond(): boolean {
        return !isUndefined(this.second);
    }

    public isEmpty() {
        return !this.hasFirst() && !this.hasSecond();
    }

    public isFull() {
        return this.hasFirst() && this.hasSecond();
    }

    public has(n: number): boolean {
        if (n == 1) {
            return this.hasFirst();
        }

        if (n == 2) {
            return this.hasSecond();
        }

        throw new InvalidIndexException();
    }

    public get(n: number): T1 | T2 {
        if (n == 1) {
            return this.first;
        }

        if (n == 2) {
            return this.second;
        }

        throw new InvalidIndexException();
    }

    public * keys(): Iterable<number> {
        yield 1;
        yield 2;
    }

    public * values(): Iterable<T1 | T2> {
        yield this.first;
        yield this.second;
    }

    public * entries(): Iterable<[number, T1 | T2]> {
        yield [1, this.first];
        yield [2, this.second];
    }

    public * presentKeys(): Iterable<number> {
        if (this.hasFirst()) {
            yield 1;
        }
        if (this.hasSecond()) {
            yield 2;
        }
    }

    public * presentValues(): Iterable<T1 | T2> {
        if (this.hasFirst()) {
            yield this.first;
        }
        if (this.hasSecond()) {
            yield this.second;
        }
    }

    public * presentEntries(): Iterable<[number, T1 | T2]> {
        if (this.hasFirst()) {
            yield [1, this.first];
        }
        if (this.hasSecond()) {
            yield [2, this.second];
        }
    }

    public clone(): Tuple2<T1, T2> {
        return new Tuple2(this.first, this.second);
    }

    public swap(): Tuple2<T2, T1> {
        return new Tuple2(this.second, this.first);
    }

    public toString() {
        return `(${this.first}, ${this.second})`;
    }

    public toArray(): [T1, T2] {
        return [this.first, this.second];
    }
}

export class TupleException extends Error {
}

export class NonexistentTupleException extends TupleException {
}

export class InvalidIndexException extends TupleException {
}