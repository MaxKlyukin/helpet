"use strict";

import {Logger} from "./log/Logger";
import {System} from "./System";

export class ErrorHandler {
    private logger = Logger.getLogger(ErrorHandler);

    public register() {
        if (System.isNode) {
            // @ts-ignore
            process.addListener('uncaughtException', this.handleError.bind(this));
            // @ts-ignore
            process.addListener('unhandledRejection', this.handleRejection.bind(this));
        } else {
            // @ts-ignore
            window.addEventListener('error', this.handleError.bind(this));
            // @ts-ignore
            window.addEventListener('unhandledrejection', this.handleRejection.bind(this));
        }
    }

    private handleError(error: Error) {
        this.logger.error('Caught unhandled exception', error);
    }

    private handleRejection(reason: any, promise: Promise<any>) {
        this.logger.error("Caught unhandled rejection", {
            reason: reason,
            promise: promise,
        });
    }
}