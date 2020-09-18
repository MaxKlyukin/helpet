"use strict";

export class Dating {
    public static max(date1: Date, date2: Date): Date {
        return date1 >= date2 ? date1 : date2;
    }

    public static add(date: Date, seconds: number): Date {
        const newDate = new Date(date.toString());
        newDate.setSeconds(newDate.getSeconds() + seconds);

        return newDate;
    }

    public static diffSeconds(date1: Date, date2: Date): number {
        return Math.floor((+date1 - +date2) / 1000);
    }
}