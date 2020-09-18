"use strict";

import {expect} from "chai";
import {KeyValue, List} from "../../src/type/List";
import {None, Some} from "../../src/type/Option";
import {Dating} from "../../src/Dating";

describe('List', () => {

    it('can be created empty', function () {
        const list = new List<any>();

        return expect(list).to.be.instanceOf(List)
            && expect(list.isEmpty).to.be.true
            && expect(list).to.have.lengthOf(0)
    });

    it('can be created from empty array', function () {
        const array: any[] = [];
        const list = List.from(array);

        return expect(list).to.be.instanceOf(List)
            && expect(list).to.have.lengthOf(0)
    });

    it('can be created from array with one element', function () {
        const array = [777];
        const list = List.from(array);

        return expect(list).to.be.instanceOf(List)
            && expect(list.isEmpty).to.be.false
            && expect(list).to.have.lengthOf(1)
            && expect(list).to.be.deep.equal([777])
    });

    it('can be created from array', function () {
        const array = [1, 2, 3];
        const list = List.from(array);

        return expect(list).to.be.instanceOf(List)
            && expect(list).to.have.lengthOf(3)
            && expect(list).to.be.deep.equal([1, 2, 3])
    });

    it('can be created from iterator', function () {
        const array = new Set([4, 5, 6]);
        const iterator: IterableIterator<number> = array.values();

        const list = List.from(iterator);

        return expect(list).to.be.instanceOf(List)
            && expect(list).to.have.lengthOf(3)
            && expect(list).to.be.deep.equal([4, 5, 6])
    });

    it('can be created from set', function () {
        const set = new Set([5, 6, 3, 6]);

        const list = List.from(set);

        return expect(list).to.be.instanceOf(List)
            && expect(list).to.have.lengthOf(3)
            && expect(list).to.be.deep.equal([5, 6, 3])
    });

    it('can be created from no elements', function () {
        const list = List.of();

        return expect(list).to.be.instanceOf(List)
            && expect(list).to.have.lengthOf(0)
    });

    it('can be created from one element', function () {
        const list = List.of(8);

        return expect(list).to.be.instanceOf(List)
            && expect(list).to.have.lengthOf(1)
            && expect(list).to.be.deep.equal([8])
    });

    it('can be created from several elements', function () {
        const list = List.of(9, 10, 11);

        return expect(list).to.be.instanceOf(List)
            && expect(list).to.have.lengthOf(3)
            && expect(list).to.be.deep.equal([9, 10, 11])
    });

    it('can add elements to array', function () {
        const list = new List(1, 2, 3);

        const addedIndex = list.add(4);

        return expect(list).to.have.lengthOf(4)
            && expect(addedIndex).to.be.eq(3)
            && expect(list).to.be.deep.equal([1, 2, 3, 4])
    });

    it('can remove elements from array', function () {
        const list = new List(1, 2, 3, 4);

        const removedElement = list.remove(1);

        return expect(list).to.have.lengthOf(3)
            && expect(removedElement).to.be.eq(2)
            && expect(list).to.be.deep.equal([1, 3, 4])
    });

    it('can get random elements from array', function () {
        const list = new List(1, 2, 3, 4);

        const randomElement = list.randomElement;

        return expect(randomElement).to.exist
            && expect(randomElement).to.be.oneOf(list)
    });

    it('can shuffle an array', function () {
        const list = new List(1, 2, 3, 4);

        const shuffled = list.shuffled;

        return expect(shuffled).to.be.instanceOf(List)
            && expect(shuffled).to.have.lengthOf(4)
            && expect(shuffled).to.be.have.members(list)
    });

    it('can be mapped', function () {
        const list = new List(1, 2, 3);

        const mapped = list.map(value => value * 3);

        return expect(mapped).to.be.instanceOf(List)
            && expect(mapped).to.be.deep.equal([3, 6, 9])
    });

    it('can be filtered', function () {
        const list = new List(3, 4, 5, 6);

        const filtered = list.filter(value => value >= 5);

        return expect(filtered).to.be.instanceOf(List)
            && expect(filtered).to.be.deep.equal([5, 6])
    });

    it('can be splitted', function () {
        const list = new List(+1, -8, -11, +7, -3);

        const [positive, negative] = list.split(value => value >= 0);

        return expect(positive).to.be.instanceOf(List)
            && expect(negative).to.be.instanceOf(List)
            && expect(positive).to.be.deep.equal([1, 7])
            && expect(negative).to.be.deep.equal([-8, -11, -3])
    });

    it('can be flat mapped', function () {
        const list = new List(1, 2, 3);

        const flatMapped = list.flatMap(value => [value, value * 2]);

        return expect(flatMapped).to.be.instanceOf(List)
            && expect(flatMapped).to.be.deep.equal([1, 2, 2, 4, 3, 6])
    });

    it('can be reversed', function () {
        const list = new List(1, 2, 3);

        const reversed = list.reversed;

        return expect(reversed).to.be.instanceOf(List)
            && expect(reversed).to.be.deep.equal([3, 2, 1])
    });

    it('can take', function () {
        const list = new List(10, 11, 12, 13, 14, 15);

        const taken = list.take(3);

        return expect(taken).to.be.instanceOf(List)
            && expect(taken).to.be.deep.equal([10, 11, 12])
    });

    it('can take more than exists', function () {
        const list = new List(16, 17);

        const taken = list.take(3);

        return expect(taken).to.be.instanceOf(List)
            && expect(taken).to.be.deep.equal([16, 17])
    });

    it('can drop', function () {
        const list = new List(10, 11, 12, 13, 14, 15);

        const dropped = list.drop(2);

        return expect(dropped).to.be.instanceOf(List)
            && expect(dropped).to.be.deep.equal([12, 13, 14, 15])
    });

    it('can drop more than exists', function () {
        const list = new List(16, 17);

        const dropped = list.drop(3);

        return expect(dropped).to.be.instanceOf(List)
            && expect(dropped).to.be.empty
    });

    it('can be sorted with numbers', function () {
        const list = new List(11, 1, 111, 10, 3);

        const sorted = list.sorted;

        return expect(sorted).to.be.instanceOf(List)
            && expect(sorted).to.be.deep.equal([1, 3, 10, 11, 111])
    });

    it('can be sorted with strings', function () {
        const list = new List('11', 'aa', '1', 'a', '111', '10', '3', 'b');

        const sorted = list.sorted;

        return expect(sorted).to.be.instanceOf(List)
            && expect(sorted).to.be.deep.equal(['1', '10', '11', '111', '3', 'a', 'aa', 'b'])
    });

    it('can be sorted by some field', function () {
        const list = new List<Box<number>>(new Box(7), new Box(1), new Box(3), new Box(6));

        const sortedList = list.sortedBy(box => box.value);

        return expect(sortedList).to.be.instanceOf(List)
            && expect(list.map(box => box.value)).to.be.deep.equal([7, 1, 3, 6])
            && expect(sortedList.map(box => box.value)).to.be.deep.equal([1, 3, 6, 7])
    });

    it('can be sorted by some field containing date', function () {
        const now = new Date();
        const past = Dating.add(now, -600);
        const future = Dating.add(now, 600);

        const list = new List<Box<Date>>(new Box(now), new Box(future), new Box(past));

        const sortedList = list.sortedBy(box => box.value);

        return expect(sortedList).to.be.instanceOf(List)
            && expect(sortedList.map(box => box.value)).to.be.deep.equal([past, now, future])
    });

    it('checks if passes for all', function () {
        const list = new List(1, 2, 3, 4, 5);

        const allLessThanSix = list.forAll(value => value < 6);
        const allIsEven = list.forAll(value => value % 2 == 0);

        return expect(allLessThanSix).to.be.true
            && expect(allIsEven).to.be.false
    });

    it('checks if value exists in array', function () {
        const list = new List(1, 2, 3, 4, 5);

        const existsFive = list.exists(value => value == 5);
        const existsGreaterThanSix = list.exists(value => value > 6);

        return expect(existsFive).to.be.true
            && expect(existsGreaterThanSix).to.be.false
    });

    it('can get rid of not unique values', function () {
        const list = new List(1, 2, 2, 3, 4, 4, 4);

        const unique = list.unique;

        return expect(unique).to.be.instanceOf(List)
            && expect(unique).to.have.lengthOf(4)
            && expect(unique).to.be.deep.equal([1, 2, 3, 4])
    });

    it('can return first value', function () {
        const list = new List(3, 5);

        const first = list.first;

        return expect(first).to.be.instanceOf(Some)
            && expect(first.get).to.be.eq(3)
    });

    it('can return none as first value', function () {
        const list = new List();

        const first = list.first;

        return expect(first).to.be.eq(None)
    });

    it('can return last value', function () {
        const list = new List(3, 5);

        const last = list.last;

        return expect(last).to.be.instanceOf(Some)
            && expect(last.get).to.be.eq(5)
    });

    it('can return none as last value', function () {
        const list = new List();

        const last = list.last;

        return expect(last).to.be.eq(None)
    });

    it('can be created flatten from array of arrays', function () {
        const arrayOfArrays = [
            [1, 2, 3],
            [7, 8],
        ];

        const flatten = List.flatten(arrayOfArrays);

        return expect(flatten).to.be.instanceOf(List)
            && expect(flatten).to.have.lengthOf(5)
            && expect(flatten).to.be.deep.equal([1, 2, 3, 7, 8])
    });

    it('can be created flatten from iterator of arrays', function () {
        const mapOfArrays: Map<string, number[]> = new Map([
            ["a", [8, 9]],
            ["b", [14, 15]],
            ["c", [18, 19]],
        ]);

        const iteratorOfArrays: IterableIterator<number[]> = mapOfArrays.values();

        const flatten = List.flatten(iteratorOfArrays);

        return expect(flatten).to.be.instanceOf(List)
            && expect(flatten).to.have.lengthOf(6)
            && expect(flatten).to.be.deep.equal([8, 9, 14, 15, 18, 19])
    });

    it('can be created from Map', function () {
        const map = new Map([["a", 1], ["c", 3]]);
        const list = List.fromMap(map);

        return expect(list).to.be.instanceOf(List)
            && expect(list).to.have.lengthOf(2)
            && expect(list[0]).to.be.instanceOf(KeyValue)
            && expect(list[0].key).to.be.eq("a")
            && expect(list[0].value).to.be.eq(1)
            && expect(list[1].key).to.be.eq("c")
            && expect(list[1].value).to.be.eq(3)
    });
});


class Box<T> {
    constructor(public value: T) {
    }
}