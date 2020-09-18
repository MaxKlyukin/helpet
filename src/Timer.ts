"use strict";

import {forSeconds} from "./Awaiter";

export enum CompletedBy {ACTION, EXCEPTION, TIMEOUT, HALT}

export class Timer<A> {

    public readonly timeSeconds: number;

    private halter: (() => void) | null = null;

    private haltPromise: Promise<void> | null = null;
    private timerPromise: Promise<void> | null = null;

    private completedBy: CompletedBy | null = null;

    private result: A | null = null;
    private exception: any = null;

    private running: boolean = false;

    constructor(timeSeconds: number) {
        this.timeSeconds = timeSeconds;

        this.createNewHalter();
    }

    public async run(action: () => Promise<A>): Promise<A> {
        this.ensureReady();
        this.running = true;
        this.clear();

        this.timerPromise = this.startTimer();
        const actionPromise = this.runAction(action);

        await Promise.race([this.timerPromise, this.haltPromise, actionPromise]);

        this.running = false;

        if (this.completedBy == CompletedBy.EXCEPTION) {
            throw this.exception;
        }
        if (this.completedBy == CompletedBy.TIMEOUT) {
            throw new TimeOutException();
        }
        if (this.completedBy == CompletedBy.HALT) {
            throw new HaltException();
        }

        return <A>this.result;
    }

    public isRunning(): boolean {
        return this.running;
    }

    public getResult(): A|null {
        return this.result;
    }

    public getCompletedBy(): CompletedBy|null {
        return this.completedBy;
    }

    public getException(): any {
        return this.exception;
    }

    public async tillTimerCompletes(): Promise<void> {
        if (this.running) {
            await this.timerPromise;
        }
    }

    public halt() {
        if (this.running) {
            this.completedBy = CompletedBy.HALT;
            const halter = this.halter;
            this.createNewHalter();
            if (halter) halter();
        }
    }

    private async runAction(action: () => Promise<A>) {
        try {
            this.result = await action();
            this.completedBy = CompletedBy.ACTION;
        } catch (e) {
            this.exception = e;
            this.completedBy = CompletedBy.EXCEPTION;
        }
    }

    private async startTimer() {
        await forSeconds(this.timeSeconds);
        if (this.completedBy == null) {
            this.completedBy = CompletedBy.TIMEOUT;
        }
    }

    private ensureReady() {
        if (this.running) {
            throw new NotReadyException();
        }
    }

    private clear() {
        this.completedBy = null;
        this.result = null;
        this.exception = null;
    }

    private createNewHalter() {
        this.haltPromise = new Promise<void>((resolve) =>
            this.halter = () => resolve());
    }
}

export class TimerException extends Error {
}

export class NotReadyException extends TimerException {
    public static readonly MESSAGE = "Timer is not ready";

    constructor() {
        super(NotReadyException.MESSAGE);
    }
}

export class TimeOutException extends TimerException {
    public static readonly MESSAGE = "Action didn't finish in time";

    constructor() {
        super(TimeOutException.MESSAGE);
    }
}

export class HaltException extends TimerException {
    public static readonly MESSAGE = "Timer was halted";

    constructor() {
        super(HaltException.MESSAGE);
    }
}