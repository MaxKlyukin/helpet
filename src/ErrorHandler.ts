"use strict";

import {Logger} from "./log/Logger";
import {System} from "./System";
import {Tuple2} from "./type/Tuple";

export class ErrorHandler {
    private static logger = Logger.getLogger(ErrorHandler);

    private static _registered: Tuple2<Function, Function>|null = null;

    public static register() {
        if (ErrorHandler._registered !== null) {
            return;
        }

        if (System.isNode) {
            this.registerNode();
        } else {
            this.registerWeb();
        }
    }

    private static registerNode() {
        ErrorHandler._registered = new Tuple2(
            ErrorHandler.handleError,
            ErrorHandler.handleRejection
        );

        // @ts-ignore
        process.addListener('uncaughtException', ErrorHandler._registered.first);
        // @ts-ignore
        process.addListener('unhandledRejection', ErrorHandler._registered.second);
    }

    private static registerWeb() {
        ErrorHandler._registered = new Tuple2(
            ErrorHandler.handleErrorWeb,
            ErrorHandler.handleRejectionWeb
        );

        // @ts-ignore
        window.addEventListener('error', ErrorHandler._registered.first);
        // @ts-ignore
        window.addEventListener('unhandledrejection', ErrorHandler._registered.second);
    }

    public static unregister() {
        if (ErrorHandler._registered === null) {
            return;
        }

        if (System.isNode) {
            this.unregisterNode();
        } else {
            this.unregisterWeb();
        }
    }

    private static unregisterNode() {
        // @ts-ignore
        process.removeListener('uncaughtException', ErrorHandler._registered.first);
        // @ts-ignore
        process.removeListener('unhandledRejection', ErrorHandler._registered.second);

        ErrorHandler._registered = null;
    }

    private static unregisterWeb() {
        // @ts-ignore
        window.removeEventListener('error', ErrorHandler._registered.first);
        // @ts-ignore
        window.removeEventListener('unhandledrejection', ErrorHandler._registered.second);

        ErrorHandler._registered = null;
    }

    private static handleErrorWeb(event: ErrorEvent) {
        let error = event.error;

        if (!error) {
            error = new Error(event.message);
            error.stack = " at " + event.filename + ":" + event.lineno;
        }

        ErrorHandler.handleError(error);

        event.preventDefault();
    }

    private static handleError(error: Error) {
        ErrorHandler.logger.error('Caught unhandled exception', error);
    }

    private static handleRejectionWeb(event: PromiseRejectionEvent) {
        ErrorHandler.handleRejection(event.reason, event.promise);

        event.preventDefault();
    }

    private static handleRejection(reason: any, promise: Promise<any>) {
        ErrorHandler.logger.error("Caught unhandled rejection", {
            reason: reason,
            promise: promise,
        });
    }
}