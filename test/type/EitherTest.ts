"use strict";

import {expect} from "chai";
import {None, Option, Some} from "../../src/type/Option";
import {either, EmptyValuesException, Left, left, Right, right} from "../../src/type/Either";
import {UNDEFINED} from "../../src/Undefined";

describe('Either', () => {

    it('fails to initialize with empty values', () => {
        expect(() => either()).to.throw(EmptyValuesException)
    });

    it('can create left', () => {
        const left1 = either(1);
        const left2 = either(1, UNDEFINED);
        const left3 = either(1, null);
        const left4 = left(1);
        const left5 = new Left(1);

        return expect(left1).to.be.instanceOf(Left)
            && expect(left2).to.be.instanceOf(Left)
            && expect(left3).to.be.instanceOf(Left)
            && expect(left4).to.be.instanceOf(Left)
            && expect(left5).to.be.instanceOf(Left)
    });

    it('can create right', () => {
        const right1 = either(UNDEFINED, 1);
        const right2 = either(null, 1);
        const right3 = right(1);
        const right4 = new Right(1);

        return expect(right1).to.be.instanceOf(Right)
            && expect(right2).to.be.instanceOf(Right)
            && expect(right3).to.be.instanceOf(Right)
            && expect(right4).to.be.instanceOf(Right)
    });

    it('behaves correct for left', () => {
        const value = left(1);

        return expect(value.isLeft).to.be.true
            && expect(value.isRight).to.be.false
            && expect(value.left).to.be.instanceOf(Some)
            && expect(value.left.get).to.be.eq(1)
            && expect(value.right).to.be.eq(None)
            && expect(value.fold(l => l + 1, () => 69)).to.be.eq(2)
    });

    it('behaves correct for right', () => {
        const value = right(1);

        return expect(value.isRight).to.be.true
            && expect(value.isLeft).to.be.false
            && expect(value.right).to.be.instanceOf(Some)
            && expect(value.right.get).to.be.eq(1)
            && expect(value.left).to.be.eq(None)
            && expect(value.fold(() => 69, r => r + 2)).to.be.eq(3)
    });

    it('behaves correct for right', () => {
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