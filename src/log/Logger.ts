"use strict";

import {ConsoleWriter, ConsoleWriterFactory, WriterType} from "./ConsoleWritter";
import {Is} from "../Is";
import {System} from "../System";

export enum LogLevel {
    ERROR = 0,
    WARNING = 1,
    INFO = 2,
    DEBUG = 3,
    TRACE = 4
}

export interface Logger {
    log(level: LogLevel, message: string, ...context: Object[]): void;
    trace(message: string, ...context: Object[]): void;
    debug(message: string, ...context: Object[]): void;
    info(message: string, ...context: Object[]): void;
    warning(message: string, ...context: Object[]): void;
    error(message: string, ...context: Object[]): void;
}

export class Logger {

    private static loggers = new Map<string, Logger>();

    public static getLogger(context: string | Function | Object): Logger {
        const contextString = this.detectContext(context);

        if (!this.loggers.has(contextString)) {
            this.loggers.set(contextString, new ConsoleLogger(contextString));
        }

        return <Logger>this.loggers.get(contextString);
    }

    public static getNullLogger(): Logger {
        return nullLogger;
    }

    private static detectContext(context: string | Function | Object): string {
        if (Is.string(context)) {
            return <string>context;
        }
        if (Is.function(context)) {
            return context.name;
        }
        if (Is.class(context)) {
            return context.constructor.name;
        }

        return "Unknown";
    }
}

class ConsoleLogger {
    private readonly outWriter: ConsoleWriter;
    private readonly errorWriter: ConsoleWriter;

    constructor(public context: string) {
        this.outWriter = ConsoleWriterFactory.get(WriterType.Out);
        this.errorWriter = ConsoleWriterFactory.get(WriterType.Error);
    }

    public log(level: LogLevel, message: string, ...context: Object[]) {
        const lines = [];
        lines.push(this.formatMessage(level, message));
        lines.push(...context.map(ctx => this.formatContext(ctx)));

        this.getWriter(level)
            .write(lines.join(System.EOL));
    }

    public trace(message: string, ...context: Object[]) {
        this.log(LogLevel.TRACE, message, ...context);
    }

    public debug(message: string, ...context: Object[]) {
        this.log(LogLevel.DEBUG, message, ...context);
    }

    public info(message: string, ...context: Object[]) {
        this.log(LogLevel.INFO, message, ...context);
    }

    public warning(message: string, ...context: Object[]) {
        this.log(LogLevel.WARNING, message, ...context);
    }

    public error(message: string, ...context: Object[]) {
        this.log(LogLevel.ERROR, message, ...context);
    }

    private getWriter(level: LogLevel): ConsoleWriter {
        if (this.isErrorLevel(level)) {
            return this.errorWriter;
        } else {
            return this.outWriter;
        }
    }

    private isErrorLevel(level: LogLevel) {
        return level == LogLevel.ERROR;
    }

    private formatMessage(level: LogLevel, message: string) {
        return `${this.formatDate(new Date())} [${this.formatLevel(level)}] ${this.context} - ${message}`;
    }

    private formatDate(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    private formatLevel(level: LogLevel) {
        return LogLevel[level].padEnd(7);
    }

    private formatContext(context: Object) {
        const formatted = (context instanceof Error)
            ? this.formatError(context)
            : this.formatObject(context);

        return formatted.split("\n").map(line => "  " + line).join("\n");
    }

    private formatError(context: Error) {
        return context.stack || context.toString();
    }

    private formatObject(context: Object) {
        return JSON.stringify(context, null, 2);
    }
}

class NullLogger implements Logger {
    log(level: LogLevel, message: string, ...context: Object[]) {
    }

    trace(message: string, ...context: Object[]) {
    }

    debug(message: string, ...context: Object[]) {
    }

    info(message: string, ...context: Object[]) {
    }

    warning(message: string, ...context: Object[]) {
    }

    error(message: string, ...context: Object[]) {
    }
}

const nullLogger = new NullLogger();