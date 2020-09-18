"use strict";

import {List} from "./List";
import {isUndefined} from "../Undefined";

export interface Option<T> {
    readonly isEmpty: boolean;
    readonly isDefined: boolean;
    readonly get: T;
    getOrElse(defaultValue: T): T;
    readonly getOrNull: T;
    map<U>(mapper: (value: T) => U): Option<U>;
    filter(predicate: (value: T) => boolean): Option<T>;
    forEach(op: (value: T) => void): void;
    readonly toList: List<T>;
}

abstract class BaseOption<T> implements Option<T> {
    public abstract get isEmpty(): boolean;
    public abstract get get(): T;

    public get isDefined() {
        return !this.isEmpty;
    }

    public getOrElse(defaultValue: T) {
        if (this.isEmpty) {
            return defaultValue;
        } else {
            return this.get;
        }
    }

    public get getOrNull() {
        return this.getOrElse(<T><unknown>null)
    }

    public map<U>(mapper: (value: T) => U): Option<U> {
        if (this.isEmpty) {
            return None;
        } else {
            return new Some(mapper(this.get));
        }
    }

    public filter(predicate: (value: T) => boolean): Option<T> {
        if (this.isEmpty || predicate(this.get)) {
            return this;
        } else {
            return None;
        }
    }

    public forEach(op: (value: T) => void): void {
        if (this.isDefined) {
            op(this.get);
        }
    }

    public get toList() {
        if (this.isEmpty) {
            return new List<T>();
        } else {
            return List.of(this.get);
        }
    }
}

class NoneOption extends BaseOption<any> {
    constructor() {
        super();
    }

    public get isEmpty() {
        return true;
    }

    public get get() {
        throw new NoSuchElementException();
    }
}

export const None: Option<any> = new NoneOption();

export class Some<T> extends BaseOption<T> {
    constructor(private value: T) {
        super();
    }

    public get isEmpty() {
        return false;
    }

    public get get() {
        return this.value;
    }
}

export function some<T>(value: T): Some<T> {
    return new Some(value);
}

export function option<T>(value?: T): Option<T> {
    if (isUndefined(value) || value === null) {
        return None;
    }

    return new Some(value);
}

export class NoSuchElementException extends Error {
}