"use strict";

import {System} from "../System";

export interface ConsoleWriter {
    write(message: string): void;
}

interface NodeStream {
    write(message: string): any;
}

abstract class NodeStreamWriter implements ConsoleWriter {
    write(message: string): void {
        this.getStream().write(message + System.EOL)
    }

    protected abstract getStream(): NodeStream;
}

class Stderr extends NodeStreamWriter {
    protected getStream(): NodeStream {
        // @ts-ignore
        return process.stderr;
    }
}

class Stdout extends NodeStreamWriter {
    protected getStream(): NodeStream {
        // @ts-ignore
        return process.stdout;
    }
}

abstract class WebConsole implements ConsoleWriter {
    write(message: string): void {
        this.logFunction(message);
    }

    protected abstract get logFunction(): (message: string) => void;
}

class WebConsoleLog extends WebConsole {
    protected get logFunction(): (message: string) => void {
        return console.log;
    }
}

class WebConsoleError extends WebConsole {
    protected get logFunction(): (message: string) => void {
        return console.error;
    }
}

export enum ConsoleWriterType {Out, Error}

export class ConsoleWriterFactory {
    public static get(type: ConsoleWriterType) {
        switch (type) {
            case ConsoleWriterType.Out:
                return System.isNode ? new Stdout() : new WebConsoleLog();
            case ConsoleWriterType.Error:
                return System.isNode ? new Stderr() : new WebConsoleError();
        }
    }
}