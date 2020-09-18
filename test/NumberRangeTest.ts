"use strict";

import {expect} from "chai";
import {NumberRange, NumberRangeException, range} from "../src";
import {List} from "../src";

describe('NumberRange', () => {

    it('throws exception if end of range is smaller than start of it', function () {
        return expect(() => new NumberRange(11, 10)).to.throw(NumberRangeException);
    });

    it('can be created', function () {
        const range = new NumberRange(10, 11);

        return expect(range.start).to.be.eq(10)
            && expect(range.end).to.be.eq(11)
    });

    it('can be created using helper function', function () {
        const r = range(10);

        return expect(r.start).to.be.eq(0)
            && expect(r.end).to.be.eq(9)
    });

    it('knows if it is singular', function () {
        const range = new NumberRange(10, 10);

        return expect(range.isSingular).to.be.true
    });

    it('knows if it is not singular', function () {
        const range = new NumberRange(10, 15);

        return expect(range.isSingular).to.be.false
    });

    it('can be created from range string', function () {
        const range = NumberRange.fromString("150-160");

        return expect(range.start).to.be.eq(150)
            && expect(range.end).to.be.eq(160)
    });

    it('can be created from number string', function () {
        const range = NumberRange.fromString("333");

        return expect(range.start).to.be.eq(333)
            && expect(range.end).to.be.eq(333)
    });

    it('can be formatted as a string', function () {
        const range = new NumberRange(77, 777);

        return expect(range.toString()).to.be.eq("77-777")
    });

    it('can be formatted as a string ignoring compact param', function () {
        const range = new NumberRange(77, 777);

        return expect(range.toString(true)).to.be.eq("77-777")
    });

    it('can be formatted as a range string if singular', function () {
        const range = new NumberRange(31, 31);

        return expect(range.toString()).to.be.eq("31-31")
    });

    it('can be formatted as a compact string if singular', function () {
        const range = new NumberRange(31, 31);

        return expect(range.toString(true)).to.be.eq("31")
    });

    it('can be iterated over numbers', function () {
        const range = new NumberRange(99, 103);

        const iteratedNumbers = [];
        for (const number of range.numbers()) {
            iteratedNumbers.push(number);
        }

        return expect(iteratedNumbers).to.have.lengthOf(5)
            && expect(iteratedNumbers).to.be.deep.equal([99, 100, 101, 102, 103])
    });

    it('can be iterated over itself', function () {
        const range = new NumberRange(69, 77);

        const iteratedNumbers = [];
        for (const number of range.numbers()) {
            iteratedNumbers.push(number);
        }

        return expect(iteratedNumbers).to.have.lengthOf(9)
            && expect(iteratedNumbers).to.be.deep.equal([69, 70, 71, 72, 73, 74, 75, 76, 77])
    });

    it('can be turned into List', function () {
        const range = new NumberRange(77, 84);

        const list = range.toList();

        return expect(list).to.have.lengthOf(8)
            && expect(list).to.be.deep.equal(new List(77, 78, 79, 80, 81, 82, 83, 84))
    });
});