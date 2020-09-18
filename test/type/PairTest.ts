"use strict";

import {expect} from "chai";
import {Pair} from "../../src/type/Pair";
import {UNDEFINED} from "../../src/Undefined";

describe('Pair', () => {

    it('can be created without values', function () {
        const pair = new Pair<boolean>();

        return expect(pair.isEmpty()).to.be.true
            && expect(pair.isFull()).to.be.false
            && expect(pair.hasFirst()).to.be.false
            && expect(pair.hasSecond()).to.be.false
            && expect(pair.first).to.be.undefined
            && expect(pair.second).to.be.undefined
    });

    it('can be created with values', function () {
        const pair = new Pair<boolean>(true, false);

        return expect(pair.isEmpty()).to.be.false
            && expect(pair.isFull()).to.be.true
            && expect(pair.hasFirst()).to.be.true
            && expect(pair.hasSecond()).to.be.true
            && expect(pair.first).to.be.true
            && expect(pair.second).to.be.false
    });

    it('can be mapped', function () {
        const pair = new Pair<boolean>(false, true);

        const mapped = pair.map<number>((v) => v ? 1 : 0);

        return expect(mapped.hasFirst()).to.be.true
            && expect(mapped.hasSecond()).to.be.true
            && expect(mapped.first).to.be.eq(0)
            && expect(mapped.second).to.be.eq(1)
    });

    it('maps each position', function () {
        const pair = new Pair<string>('one');

        const mapped = pair.map<number>(() => 1);

        return expect(mapped.hasFirst()).to.be.true
            && expect(mapped.hasSecond()).to.be.true
            && expect(mapped.first).to.be.eq(1)
            && expect(mapped.second).to.be.eq(1)
    });

    it('maps present positions', function () {
        const pair = new Pair<string>('one');

        const mapped = pair.mapPresent<number>(() => 1);

        return expect(mapped.hasFirst()).to.be.true
            && expect(mapped.hasSecond()).to.be.false
            && expect(mapped.first).to.be.eq(1)
            && expect(mapped.second).to.be.undefined
    });

    it('maps absent positions', function () {
        const pair = new Pair<string>('one');

        const mapped = pair.mapAbsent(() => 'mapped');

        return expect(mapped.hasFirst()).to.be.true
            && expect(mapped.hasSecond()).to.be.true
            && expect(mapped.first).to.be.eq('one')
            && expect(mapped.second).to.be.eq('mapped')
    });

    it('can be cloned', function () {
        const pair = new Pair<number>(7, 9);

        const cloned = pair.clone();

        return expect(cloned).to.be.not.eq(pair)
            && expect(cloned.first).to.be.eq(pair.first)
            && expect(cloned.second).to.be.eq(pair.second)
    });

    it('can be swapped', function () {
        const pair = new Pair<String>("hey", "ho");

        const swapped = pair.swap();

        return expect(swapped).to.be.not.eq(pair)
            && expect(swapped.first).to.be.eq(pair.second)
            && expect(swapped.second).to.be.eq(pair.first)
    });

    it('can be shuffled', function () {
        const pair = new Pair<boolean>(true, false);

        const swapped = pair.shuffle();

        return expect(swapped).to.be.not.eq(pair)
    });

    it('filters values', function () {
        const pair = new Pair<number>(3, 7);

        const filtered = pair.filter((value) => value > 5);

        return expect(filtered.hasFirst()).to.be.false
            && expect(filtered.hasSecond()).to.be.true
            && expect(filtered.second).to.be.eq(7);
    });

    it('can be iterated over keys', function () {
        const pair = new Pair<number>(3, 7);

        const iteratedKeys = [];
        for(const key of pair.keys()) {
            iteratedKeys.push(key);
        }

        return expect(iteratedKeys).to.have.lengthOf(2)
            && expect(iteratedKeys[0]).to.be.eq(1)
            && expect(iteratedKeys[1]).to.be.eq(2);
    });

    it('can be iterated over values', function () {
        const pair = new Pair<number>(3, 7);

        const iteratedValues = [];
        for(const value of pair.values()) {
            iteratedValues.push(value);
        }

        return expect(iteratedValues).to.have.lengthOf(2)
            && expect(iteratedValues[0]).to.be.eq(3)
            && expect(iteratedValues[1]).to.be.eq(7);
    });

    it('can be iterated over keys and values', function () {
        const pair = new Pair<number>(3, 7);

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
            && expect(iteratedValues[1]).to.be.eq(7);
    });

    it('can be iterated over present values', function () {
        const pair = new Pair<number>(UNDEFINED, 3);

        const iteratedValues = [];
        for(const value of pair.presentValues()) {
            iteratedValues.push(value);
        }

        return expect(iteratedValues).to.have.lengthOf(1)
            && expect(iteratedValues[0]).to.be.eq(3);
    });
});