"use strict";

import {expect} from "chai";
import {NonexistentTupleException, tuple, Tuple0, Tuple1, Tuple2} from "../../src/type/Tuple";
import {UNDEFINED} from "../../src/Undefined";

describe('Tuple', () => {

    describe('tuple', () => {

        it('can created Tuple0', function () {
            const tupled = tuple();

            return expect(tupled.size).to.be.eq(0)
                && expect(tupled.toString()).to.be.eq("()")
        });

        it('can created Tuple1', function () {
            const tupled = tuple(1);

            return expect(tupled.size).to.be.eq(1)
                && expect(tupled.toString()).to.be.eq("(1)")
        });

        it('can created Tuple2', function () {
            const tupled = tuple(1, 2);

            return expect(tupled.size).to.be.eq(2)
                && expect(tupled.toString()).to.be.eq("(1, 2)")
        });

        it('cannot create Tuple3', function () {
            return expect(() => tuple(1, 2, 3)).to.throw(NonexistentTupleException)
        });
    });

    describe('Tuple0', () => {

        it('can be created without values', function () {
            const pair = new Tuple0();

            return expect(pair.isEmpty()).to.be.true
                && expect(pair.isFull()).to.be.true
                && expect(pair.size).to.be.eq(0)
        });

        it('can be iterated over keys', function () {
            const pair = new Tuple0();

            const iteratedKeys = [];
            for(const key of pair.keys()) {
                iteratedKeys.push(key);
            }

            return expect(iteratedKeys).to.have.lengthOf(0)
        });

        it('can be iterated over values', function () {
            const pair = new Tuple0();

            const iteratedValues = [];
            for(const value of pair.values()) {
                iteratedValues.push(value);
            }

            return expect(iteratedValues).to.have.lengthOf(0)
        });

        it('can be iterated over keys and values', function () {
            const pair = new Tuple0();

            const iteratedKeys = [];
            const iteratedValues = [];
            for(const [key, value] of pair.entries()) {
                iteratedKeys.push(key);
                iteratedValues.push(value);
            }

            return expect(iteratedKeys).to.have.lengthOf(0)
                && expect(iteratedValues).to.have.lengthOf(0)
        });

        it('can be iterated over present values', function () {
            const pair = new Tuple0();

            const iteratedValues = [];
            for(const value of pair.presentValues()) {
                iteratedValues.push(value);
            }

            return expect(iteratedValues).to.have.lengthOf(0)
        });
    });

    describe('Tuple1', () => {

        it('can be created without values', function () {
            const pair = new Tuple1<boolean>();

            return expect(pair.isEmpty()).to.be.true
                && expect(pair.isFull()).to.be.false
                && expect(pair.size).to.be.eq(1)
                && expect(pair.hasFirst()).to.be.false
                && expect(pair.first).to.be.undefined
        });

        it('can be created with values', function () {
            const pair = new Tuple1<boolean>(false);

            return expect(pair.isEmpty()).to.be.false
                && expect(pair.isFull()).to.be.true
                && expect(pair.size).to.be.eq(1)
                && expect(pair.hasFirst()).to.be.true
                && expect(pair.first).to.be.false
        });

        it('can be iterated over keys', function () {
            const pair = new Tuple1<number>(3);

            const iteratedKeys = [];
            for(const key of pair.keys()) {
                iteratedKeys.push(key);
            }

            return expect(iteratedKeys).to.have.lengthOf(1)
                && expect(iteratedKeys[0]).to.be.eq(1)
        });

        it('can be iterated over values', function () {
            const pair = new Tuple1<number>(3);

            const iteratedValues = [];
            for(const value of pair.values()) {
                iteratedValues.push(value);
            }

            return expect(iteratedValues).to.have.lengthOf(1)
                && expect(iteratedValues[0]).to.be.eq(3)
        });

        it('can be iterated over keys and values', function () {
            const pair = new Tuple1<number>(7);

            const iteratedKeys = [];
            const iteratedValues = [];
            for(const [key, value] of pair.entries()) {
                iteratedKeys.push(key);
                iteratedValues.push(value);
            }

            return expect(iteratedKeys).to.have.lengthOf(1)
                && expect(iteratedKeys[0]).to.be.eq(1)
                && expect(iteratedValues).to.have.lengthOf(1)
                && expect(iteratedValues[0]).to.be.eq(7)
        });

        it('can be iterated over present values', function () {
            const pair = new Tuple1<number>(5);

            const iteratedValues = [];
            for(const value of pair.presentValues()) {
                iteratedValues.push(value);
            }

            return expect(iteratedValues).to.have.lengthOf(1)
                && expect(iteratedValues[0]).to.be.eq(5)
        });

        it('skips not present values when iterating over present values', function () {
            const pair = new Tuple1<number>();

            const iteratedValues = [];
            for(const value of pair.presentValues()) {
                iteratedValues.push(value);
            }

            return expect(iteratedValues).to.have.lengthOf(0)
        });
    });

    describe('Tuple2', () => {

        it('can be created without values', function () {
            const pair = new Tuple2<boolean, boolean>();

            return expect(pair.isEmpty()).to.be.true
                && expect(pair.isFull()).to.be.false
                && expect(pair.size).to.be.eq(2)
                && expect(pair.hasFirst()).to.be.false
                && expect(pair.hasSecond()).to.be.false
                && expect(pair.first).to.be.undefined
                && expect(pair.second).to.be.undefined
        });

        it('can be created with values', function () {
            const pair = new Tuple2<boolean, boolean>(true, false);

            return expect(pair.isEmpty()).to.be.false
                && expect(pair.isFull()).to.be.true
                && expect(pair.size).to.be.eq(2)
                && expect(pair.hasFirst()).to.be.true
                && expect(pair.hasSecond()).to.be.true
                && expect(pair.first).to.be.true
                && expect(pair.second).to.be.false
        });

        it('can be iterated over keys', function () {
            const pair = new Tuple2<number, number>(3, 7);

            const iteratedKeys = [];
            for(const key of pair.keys()) {
                iteratedKeys.push(key);
            }

            return expect(iteratedKeys).to.have.lengthOf(2)
                && expect(iteratedKeys[0]).to.be.eq(1)
                && expect(iteratedKeys[1]).to.be.eq(2)
        });

        it('can be iterated over values', function () {
            const pair = new Tuple2<number, number>(3, 7);

            const iteratedValues = [];
            for(const value of pair.values()) {
                iteratedValues.push(value);
            }

            return expect(iteratedValues).to.have.lengthOf(2)
                && expect(iteratedValues[0]).to.be.eq(3)
                && expect(iteratedValues[1]).to.be.eq(7)
        });

        it('can be iterated over keys and values', function () {
            const pair = new Tuple2<number, number>(3, 7);

            const iteratedKeys = [];
            const iteratedValues = [];
            for(const [key, value] of pair.entries()) {
                iteratedKeys.push(key);
                iteratedValues.push(value);
            }

            return expect(iteratedKeys).to.have.lengthOf(2)
                && expect(iteratedKeys[0]).to.be.eq(1)
                && expect(iteratedKeys[1]).to.be.eq(2)
                && expect(iteratedValues).to.have.lengthOf(2)
                && expect(iteratedValues[0]).to.be.eq(3)
                && expect(iteratedValues[1]).to.be.eq(7)
        });

        it('can be iterated over present values', function () {
            const pair = new Tuple2<number, number>(UNDEFINED, 3);

            const iteratedValues = [];
            for(const value of pair.presentValues()) {
                iteratedValues.push(value);
            }

            return expect(iteratedValues).to.have.lengthOf(1)
                && expect(iteratedValues[0]).to.be.eq(3)
        });
    });
});