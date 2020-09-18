"use strict";

import {Tuple2} from "./Tuple";
import {UNDEFINED} from "../Undefined";
import {Random} from "../Random";

export class Pair<T> extends Tuple2<T, T> {

    public withFirst(first: T): Pair<T> {
        return new Pair(first, this._second);
    }

    public withSecond(second: T): Pair<T> {
        return new Pair(this._first, second);
    }

    public get(n: number): T {
        return super.get(n);
    }

    public * values(): Iterable<T> {
        yield* super.values();
    }

    public * entries(): Iterable<[number, T]> {
        yield* super.entries();
    }

    public * presentValues(): Iterable<T> {
        yield* super.presentValues();
    }

    public * presentEntries(): Iterable<[number, T]> {
        yield* super.presentEntries();
    }

    public filter(fn: (value: T) => boolean): Pair<T> {
        return new Pair<T>(
            fn(this.first) ? this.first : UNDEFINED,
            fn(this.second) ? this.second : UNDEFINED
        );
    }

    public map<U>(fn: (value: T) => U): Pair<U> {
        return new Pair<U>(fn(this.first), fn(this.second));
    }

    public mapPresent<U>(fn: (value: T) => U): Pair<U> {
        return new Pair<U>(
            this.hasFirst() ? fn(this.first) : UNDEFINED,
            this.hasSecond() ? fn(this.second) : UNDEFINED
        );
    }

    public mapAbsent(fn: () => T): Pair<T> {
        return new Pair<T>(
            !this.hasFirst() ? fn() : this.first,
            !this.hasSecond() ? fn() : this.second
        );
    }

    public clone(): Pair<T> {
        return new Pair<T>(this.first, this.second);
    }

    public swap(): Pair<T> {
        return new Pair<T>(this.second, this.first);
    }

    public shuffle(): Pair<T> {
        return Random.bool()
            ? this.clone()
            : this.swap();
    }

    public toArray(): [T, T] {
        return [this.first, this.second];
    }

    public static from<T>(pair: Pair<T>): Pair<T> {
        return new Pair<T>(pair.first, pair.second);
    }

    public static fromArray<T>(values: T[]): Pair<T> {
        return new Pair<T>(values[0], values[1]);
    }
}
