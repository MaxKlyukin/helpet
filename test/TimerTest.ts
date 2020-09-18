"use strict";

import {expect, use as chaiUse} from "chai";
import chaiAsPromised from "chai-as-promised";
import {Awaiter} from "../src/Awaiter";
import {HaltException, NotReadyException, TimeOutException, Timer} from "../src/Timer";

chaiUse(chaiAsPromised);

describe('Timer', () => {

    function runTimer<A>(timer: Timer<A>, actionRunTime: number, action: () => A): Promise<A> {
        return timer.run(() => {
            return Awaiter.seconds(actionRunTime).then(action);
        });
    }

    it('can be completed by action', function () {
        const timer = new Timer<number>(1);

        let promise = runTimer<number>(timer, 0, () => {
            return 1;
        });

        return expect(promise).to.eventually.be.eq(1)
    });

    it('can be completed by timer', function () {
        const timer = new Timer<number>(0);

        return expect(runTimer<number>(timer, 1, () => {
            return 1;
        })).to.eventually.be.rejectedWith(TimeOutException)
    });

    it('can be completed by exception', function () {
        const error = new Error("test error");
        const timer = new Timer<void>(1);

        return expect(runTimer<void>(timer, 0, () => {
            throw error;
        })).to.eventually.be.rejectedWith(error)
    });

    it('can be completed by halt', function () {
        const timer = new Timer<number>(1);

        const promise = runTimer<number>(timer, 0, () => 1);

        timer.halt();

        return expect(promise).to.eventually.be.rejectedWith(HaltException)
    });

    it('can be not ready if previous run is in progress', function () {
        const timer = new Timer<number>(1);

        const ignoredPromise = runTimer<number>(timer, 1, () => 1);
        const promise = runTimer<number>(timer, 0.1, () => 1);

        ignoredPromise.catch(() => {});

        return expect(promise).to.eventually.be.rejectedWith(NotReadyException)
    });

    it('can be run several times', function () {
        const timer = new Timer<number>(1);

        const promise = runTimer<number>(timer, 0, () => 1);
        const promise2 = promise.then(() => runTimer<number>(timer, 0, () => 2));

        return expect(promise2).to.eventually.be.eq(2)
    });
});