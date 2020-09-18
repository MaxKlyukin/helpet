"use strict";

export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export class Enums {
    public static values<E extends Enum<E>, K extends keyof E>(theEnum: E): Set<E[K]> {
        const values = <Array<any>>Object.keys(theEnum)
            .filter(v => !isNaN(parseInt(v, 10)))
            .map(v => parseInt(v, 10));

        return new Set(values);
    }

    public static names<E extends Enum<E>>(theEnum: E): Set<string> {
        const names = Object.keys(theEnum)
            .filter(v => isNaN(parseInt(v, 10)));

        return new Set(names);
    }
}