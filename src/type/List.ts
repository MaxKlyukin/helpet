"use strict";

import {Option, option} from "./Option";

function isNumeric(n: any): n is number {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export class KeyValue<KeyType, ValueType> {

    private readonly _key: KeyType;
    private readonly _value: ValueType;

    constructor(key: KeyType, value: ValueType) {
        this._key = key;
        this._value = value;
    }

    public get key(): KeyType {
        return this._key;
    }

    public get value(): ValueType {
        return this._value;
    }
}

export class List<T> extends Array<T> {

    public get isEmpty(): boolean {
        return this.length == 0;
    }

    /** @return index of new element */
    public add(element: T): number {
        return this.push(element) - 1;
    }

    /** @return deleted element */
    public remove(index: number): T {
        return this.splice(index, 1)[0];
    }

    public get randomElement(): T {
        return this[Math.floor(Math.random() * this.length)];
    }

    public get shuffled(): List<T> {
        let counter = this.length;
        const shuffled = List.from(this);

        while (counter > 0) {
            const index = Math.floor(Math.random() * counter);

            counter--;

            const temp = shuffled[counter];
            shuffled[counter] = shuffled[index];
            shuffled[index] = temp;
        }

        return shuffled;
    }

    public map<U>(mapper: (value: T, index: number, array: T[]) => U): List<U> {
        return <List<U>>super.map(mapper);
    }

    public filter(predicate: (value: T, index: number, array: T[]) => boolean): List<T> {
        return <List<T>>super.filter(predicate);
    }

    public split(predicate: (value: T, index: number, array: T[]) => boolean): [List<T>, List<T>] {
        const positive = this.filter(predicate);
        const negative = this.filter((value, index, array) => !predicate(value, index, array));

        return [positive, negative];
    }

    public flatMap<U>(listGenerator: (element: T, index?: number) => U[]): List<U> {
        return <List<U>>List.prototype.concat.apply(new List(), this.map(listGenerator));
    }

    public get reversed(): List<T> {
        const reversed = List.from(this);

        return <List<T>>reversed.reverse();
    }

    public get sorted(): List<T> {
        if (this.isEmpty) {
            return new List();
        }

        const sorted = List.from(this);

        return sorted.forAll(isNumeric)
            ? <List<T>>sorted.sort((a: any, b: any) => a - b)
            : <List<T>>sorted.sort();
    }

    public sortedBy<U>(extractor: (element: T, index?: number) => U): List<T> {
        const sorted = List.from(this);
        const sortValues = sorted.toMapped(extractor);

        return sorted.sort((value1, value2) => {
            return compare(sortValues.get(value1), sortValues.get(value2));
        });
    }

    public take(number: number): List<T> {
        return <List<T>>List.from(this).slice(0, number);
    }

    public drop(number: number): List<T> {
        return <List<T>>List.from(this).slice(number);
    }

    public toMapped<U>(mapper: (element: T, index?: number) => U): Map<T, U> {
        const mapElementToSort: (element: T, index: number) => [T, U]
            = (element, index) => [element, mapper(element, index)];

        return new Map(this.map(mapElementToSort));
    }

    public forAll(predicate: (element: T, index?: number) => boolean): boolean {
        for (const [index, value] of this.entries()) {
            if (!predicate(value, index)) {
                return false;
            }
        }

        return true;
    }

    public exists(predicate: (element: T, index?: number) => boolean): boolean {
        for (const [index, value] of this.entries()) {
            if (predicate(value, index)) {
                return true;
            }
        }

        return false;
    }

    public get unique(): List<T> {
        return List.from(new Set(this));
    }

    public get first(): Option<T> {
        return option(this[0]);
    }

    public get last(): Option<T> {
        return option(this[this.length - 1]);
    }

    public with(...a: T[]): List<T> {
        return <List<T>>this.concat(a);
    }

    public static fromMap<K, V>(map: Map<K, V>): List<KeyValue<K, V>> {
        return List.from(map.entries())
            .map(value => new KeyValue(value[0], value[1]));
    }

    public static flatten<T>(iterable: Iterable<T[]> | ArrayLike<T[]>): List<T> {
        return List.from(iterable)
            .flatMap(value => value);
    }

    public static from<T>(iterable: Iterable<T> | ArrayLike<T>): List<T> {
        // @ts-ignore
        return <List<T>>Array.from.call(List, iterable);
    }

    public static of<T>(...items: T[]): List<T> {
        return <List<T>>Array.of.apply(List, items);
    }
}

function compare(value1: any, value2: any): number {
    if (value1 < value2) {
        return -1;
    }
    if (value1 > value2) {
        return 1;
    }

    return 0;
}
