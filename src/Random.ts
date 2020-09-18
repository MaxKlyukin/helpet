"use strict";

export class Random {

    public static int(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static bool(): boolean {
        return Math.random() >= 0.5;
    }
}