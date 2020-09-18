"use strict";

import {expect} from "chai";
import {None, NoSuchElementException, option, Option, some, Some} from "../../src/type/Option";

describe('Option', () => {

    it('it can create none', () => {
        const none1 = option();
        const none2 = option(undefined);
        const none3 = option(null);

        return expect(none1).to.be.eq(None)
            && expect(none2).to.be.eq(None)
            && expect(none3).to.be.eq(None)
    });

    it('it can create some', () => {
        const some1 = option(1);
        const some2 = some(1);
        const some3 = new Some(1);

        return expect(some1).to.be.instanceOf(Some)
            && expect(some2).to.be.instanceOf(Some)
            && expect(some3).to.be.instanceOf(Some)
    });

    it('it knows correct behaviour of none', () => {
        const option: Option<string> = None;

        return expect(option.isEmpty).to.be.true
            && expect(option.isDefined).to.be.false
            && expect(() => option.get).to.throw(NoSuchElementException)
            && expect(option.getOrElse("abc")).to.be.eq("abc")
            && expect(option.getOrNull).to.be.null
            && expect(option.map(() => 123)).to.be.eq(None)
            && expect(option.filter(value => value == null)).to.be.eq(None)
            && expect(option.toList).to.be.empty
    });

    it('it knows correct behaviour of some', () => {
        const option: Option<string> = new Some("abc");

        return expect(option.isEmpty).to.be.false
            && expect(option.isDefined).to.be.true
            && expect(option.get).to.be.eq("abc")
            && expect(option.getOrElse("dce")).to.be.eq("abc")
            && expect(option.getOrNull).to.be.eq("abc")
            && expect(option.map(value => value + "d").get).to.be.eq("abcd")
            && expect(option.filter(value => value == "abc")).to.be.eq(option)
            && expect(option.filter(value => value == "dce")).to.be.eq(None)
            && expect(option.toList).to.be.have.lengthOf(1)
            && expect(option.toList[0]).to.be.eq("abc")
    });
});