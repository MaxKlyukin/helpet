"use strict";

import {None, Option, some} from "./Option";
import {isUndefined} from "../Undefined";

export interface Either<L, R> {

    readonly isLeft: boolean;
    readonly isRight: boolean;

    readonly left: Option<L>;
    readonly right: Option<R>;

    fold<T>(opLeft: (left: L) => T, opRight: (right: R) => T): T;
}

export class Left<L> implements Either<L, any> {
    private readonly value: L;

    constructor(value: L) {
        this.value = value;
    }

    public get isLeft() {
        return true;
    }

    public get isRight() {
        return false;
    }

    public get left() {
        return some(this.value);
    }

    public get right() {
        return None;
    }

    fold<T>(opLeft: (left: L) => T, opRight: (right: any) => T): T {
        return opLeft(this.value);
    }
}

export class Right<R> implements Either<any, R> {
    private readonly value: R;

    constructor(value: R) {
        this.value = value;
    }

    public get isLeft() {
        return false;
    }

    public get isRight() {
        return true;
    }

    public get left() {
        return None;
    }

    public get right() {
        return some(this.value);
    }

    fold<T>(opLeft: (left: any) => T, opRight: (right: R) => T): T {
        return opRight(this.value);
    }
}

export function right<R>(value: R): Right<R> {
    return new Right(value);
}

export function left<L>(value: L): Left<L> {
    return new Left(value);
}


export function either<L, R>(left?: L, right?: R): Either<L, R> {
    if (!isUndefined(left) && left !== null) {
        return new Left(left);
    }

    if (!isUndefined(right) && right !== null) {
        return new Right(right);
    }

    throw new EmptyValuesException();
}

export class EmptyValuesException extends Error {
}