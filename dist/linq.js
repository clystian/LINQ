(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Enumerable = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
function* Forward(target) {
    yield* target;
}
exports.Forward = Forward;
function* Reverse(target) {
    for (let i = target.length - 1; i >= 0; i--) {
        yield target[i];
    }
}
exports.Reverse = Reverse;
function* Select(target, transform) {
    let index = 0;
    for (let value of target) {
        yield transform(value, index++);
    }
}
exports.Select = Select;
function* DefaultIfEmpty(target, defaultValue) {
    let iterator = target[Symbol.iterator]();
    let result = iterator.next();
    if (result.done) {
        yield defaultValue;
    }
    else {
        yield* target;
    }
}
exports.DefaultIfEmpty = DefaultIfEmpty;
function* ChunkBy(target, keySelect, elementSelector, resultSelector) {
    let key, box, i = 0;
    for (let value of target) {
        let newKey = keySelect(value, i++);
        if (key !== newKey && box) {
            yield resultSelector(key, box);
            box = undefined;
        }
        if (!box) {
            box = new Array();
        }
        key = newKey;
        box.push(elementSelector(value));
    }
    if (box) {
        yield resultSelector(key, box);
    }
}
exports.ChunkBy = ChunkBy;
function* Distinct(target, keySelector) {
    let set = new Set();
    for (let value of target) {
        let key = keySelector(value);
        if (set.has(key))
            continue;
        set.add(key);
        yield value;
    }
}
exports.Distinct = Distinct;
function* DistinctFast(target) {
    let set = new Set();
    for (let value of target) {
        if (set.has(value))
            continue;
        set.add(value);
        yield value;
    }
}
exports.DistinctFast = DistinctFast;
function* OfType(target, obj, typeName) {
    if (typeName) {
        for (let value of target) {
            if (typeName == typeof (value)) {
                yield value;
            }
            else if (value instanceof obj) {
                yield value;
            }
        }
    }
    else {
        for (let value of target) {
            if (value instanceof obj) {
                yield value;
            }
        }
    }
}
exports.OfType = OfType;
function* Where(target, predicate) {
    let index = 0;
    for (let value of target) {
        if (!predicate(value, index++))
            continue;
        yield value;
    }
}
exports.Where = Where;
function* Skip(target, skip) {
    let index = 0;
    for (let value of target) {
        if (skip > index++)
            continue;
        yield value;
    }
}
exports.Skip = Skip;
function* SkipWhile(target, predicate) {
    let index = 0, skipped = false;
    for (let value of target) {
        if (!skipped && !(skipped = !predicate(value, index++)))
            continue;
        yield value;
    }
}
exports.SkipWhile = SkipWhile;
function* TakeWhile(target, predicate) {
    let index = 0;
    for (let value of target) {
        if (!predicate(value, index++))
            break;
        yield value;
    }
}
exports.TakeWhile = TakeWhile;
function* Intersect(target, exceptions, condition, keySelect) {
    if (keySelect) {
        for (let value of target) {
            if (condition == exceptions.has(keySelect(value)))
                continue;
            yield value;
        }
    }
    else {
        for (let value of target) {
            if (condition == exceptions.has(value))
                continue;
            yield value;
        }
    }
}
exports.Intersect = Intersect;
function* Repeat(value, count) {
    for (let i = 0; i < count; i++) {
        yield value;
    }
}
exports.Repeat = Repeat;
function* Range(value, count) {
    let current = value;
    for (let i = 0; i < count; i++) {
        yield current;
        current++;
    }
}
exports.Range = Range;
function* Union(first, second, keySelector) {
    let set = new Set();
    for (let value of first) {
        let key = keySelector(value);
        if (set.has(key))
            continue;
        set.add(key);
        yield value;
    }
    for (let value of second) {
        let key = keySelector(value);
        if (set.has(key))
            continue;
        set.add(key);
        yield value;
    }
}
exports.Union = Union;
function* UnionFast(first, second) {
    let set = new Set();
    for (let value of first) {
        if (set.has(value))
            continue;
        set.add(value);
        yield value;
    }
    for (let value of second) {
        if (set.has(value))
            continue;
        set.add(value);
        yield value;
    }
}
exports.UnionFast = UnionFast;
function* Join(target, oKeySelect, transform, map) {
    for (let value of target) {
        let key = oKeySelect(value);
        if (!key)
            continue;
        let innerSet = map.get(key);
        if (!innerSet)
            continue;
        for (let inner of innerSet) {
            yield transform(value, inner);
        }
    }
}
exports.Join = Join;
function* GroupJoin(target, oKeySelect, transform, map) {
    for (let value of target) {
        let innerSet = undefined;
        let key = oKeySelect(value);
        if (key) {
            innerSet = map.get(key);
        }
        yield transform(value, innerSet);
    }
}
exports.GroupJoin = GroupJoin;
function* GroupBy(map, resultSelect) {
    for (let key of map.keys()) {
        yield resultSelect(key, map.get(key));
    }
}
exports.GroupBy = GroupBy;
function* SelectMany(target, selector, transform) {
    let index = 0;
    for (let item of target) {
        for (let collectionItem of selector(item, index++)) {
            yield transform(item, collectionItem);
        }
    }
}
exports.SelectMany = SelectMany;
function* Concat(target, second) {
    yield* target;
    yield* second;
}
exports.Concat = Concat;
function* Zip(first, second, transform, _index = 0) {
    let iteratorOne = first[Symbol.iterator]();
    let iteratorTwo = second[Symbol.iterator]();
    let retOne, retTwo;
    while (!(retOne = iteratorOne.next()).done && !(retTwo = iteratorTwo.next()).done) {
        yield transform(retOne.value, retTwo.value);
    }
}
exports.Zip = Zip;
/** Copyright (c) ENikS.  All rights reserved. */

},{}],2:[function(require,module,exports){
"use strict";
///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
//-----------------------------------------------------------------------------
//  CSharp Enumerator implementation
//-----------------------------------------------------------------------------
//  Gets Iterator and turns it into CSharpEnumerator 
class CSharpEnumerator {
    constructor(sourceIterator) {
        this._iterator = sourceIterator;
    }
    /** Gets the current element in the collection. */
    get Current() {
        return this._result.value;
    }
    /** Advances the enumerator to the next element of the collection.*/
    MoveNext() {
        this._result = this._iterator.next();
        return !this._result.done;
    }
    /** Sets the enumerator to its initial position, which is before the first
    * element in the collection. */
    Reset() {
        throw "JavaScript iterators could not be Reset";
    }
}
exports.CSharpEnumerator = CSharpEnumerator;
/** Copyright (c) ENikS.  All rights reserved. */

},{}],3:[function(require,module,exports){
"use strict";
///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("./generators");
const Constant = require("./utilities");
const Iterator = require("./iterators");
//-----------------------------------------------------------------------------
//  Implementation of EnumerableConstructor interface
//-----------------------------------------------------------------------------
/**
* Converts any Iterable<T> object into LINQ-able object
* @param TSource An Array, Map, Set, String or other Iterable object.
*/
function getEnumerable(TSource) {
    return new EnumerableImpl(TSource);
}
exports.default = getEnumerable;
exports.AsEnumerable = getEnumerable;
exports.asEnumerable = getEnumerable;
exports.From = getEnumerable;
exports.from = getEnumerable;
/**
* Generates <count> of <T> elements starting with <start>. T is any
* type which could be cast to number: number, enum, etc.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Range(0, 7).Sum();
*/
function getRange(start, count) {
    return new EnumerableImpl(undefined, Generator.Range, [start, count]);
}
exports.range = getRange;
exports.Range = getRange;
/**
* Repeat element <start> of type T <count> of times.
* @param start First value in sequence.
* @param count Number of elements to iteratel.
* @example
*     var sum = Repeat("v", 7);
*/
function getRepeat(value, count) {
    return new EnumerableImpl(undefined, Generator.Repeat, [value, count]);
}
exports.repeat = getRepeat;
exports.Repeat = getRepeat;
//-----------------------------------------------------------------------------
//  Enumerable Implementation
//-----------------------------------------------------------------------------
class EnumerableImpl {
    constructor(target, factory, arg) {
        this._target = target;
        this._factory = factory;
        this._factoryArg = arg;
        // JavaScript naming convention
        this['aggregate'] = this.Aggregate;
        this['all'] = this.All;
        this['any'] = this.Any;
        this['average'] = this.Average;
        this['chunkBy'] = this.ChunkBy;
        this['contains'] = this.Contains;
        this['count'] = this.Count;
        this['max'] = this.Max;
        this['min'] = this.Min;
        this['elementAt'] = this.ElementAt;
        this['elementAtOrDefault'] = this.ElementAtOrDefault;
        this['first'] = this.First;
        this['firstOrDefault'] = this.FirstOrDefault;
        this['last'] = this.Last;
        this['lastOrDefault'] = this.LastOrDefault;
        this['sequenceEqual'] = this.SequenceEqual;
        this['single'] = this.Single;
        this['singleOrDefault'] = this.SingleOrDefault;
        this['sum'] = this.Sum;
        this['toArray'] = this.ToArray;
        this['toMap'] = this.ToMap;
        this['toDictionary'] = this.ToDictionary;
        this['defaultIfEmpty'] = this.DefaultIfEmpty;
        this['concat'] = this.Concat;
        this['distinct'] = this.Distinct;
        this['except'] = this.Except;
        this['groupBy'] = this.GroupBy;
        this['groupJoin'] = this.GroupJoin;
        this['intersect'] = this.Intersect;
        this['join'] = this.Join;
        this['ofType'] = this.OfType;
        this['orderBy'] = this.OrderBy;
        this['orderByDescend'] = this.OrderByDescending;
        this['range'] = this.Range;
        this['repeat'] = this.Repeat;
        this['reverse'] = this.Reverse;
        this['select'] = this.Select;
        this['selectMany'] = this.SelectMany;
        this['skip'] = this.Skip;
        this['skipWhile'] = this.SkipWhile;
        this['take'] = this.Take;
        this['takeWhile'] = this.TakeWhile;
        this['union'] = this.Union;
        this['where'] = this.Where;
        this['zip'] = this.Zip;
    }
    ///////////////////////////////////////////////////////////////////////////
    /** Returns JavaScript iterator */
    [Symbol.iterator]() {
        return (null != this._factory) ? this._factory.apply(this, this._factoryArg)
            : this._target[Symbol.iterator]();
    }
    /** Returns C# style enumerator */
    GetEnumerator() {
        return new Iterator.CSharpEnumerator(this[Symbol.iterator]());
    }
    Aggregate(alpha, beta = Constant.selfFn, gamma = Constant.selfFn) {
        let zero;
        let method;
        let selector;
        if (Constant.CONST_FUNCTION === typeof alpha) {
            method = alpha;
            selector = beta;
        }
        else {
            zero = alpha;
            method = beta;
            selector = gamma;
        }
        let result = zero;
        for (let value of this) {
            if ([null, undefined].indexOf(result) > -1 || (isNaN(result) && !result))
                result = Constant.getDefaultVal(typeof (value));
            result = method(result, value);
        }
        return selector(result);
    }
    All(predicate = Constant.trueFn) {
        for (let value of this) {
            if (!predicate(value)) {
                return false;
            }
        }
        return true;
    }
    Any(predicate) {
        let iterator;
        // Check if at least one exist
        if (!predicate && (iterator = this[Symbol.iterator]())) {
            return !iterator.next().done;
        }
        // Check if any satisfy the criteria
        for (let value of this) {
            if (predicate(value)) {
                return true;
            }
        }
        return false;
    }
    Average(func = Constant.selfFn) {
        let sum = 0, count = 0;
        for (let value of this) {
            sum += func(value);
            count++;
        }
        return sum / count;
    }
    Contains(value, equal = (a, b) => a === b) {
        for (let item of this) {
            if (equal(item, value)) {
                return true;
            }
        }
        return false;
    }
    Count(predicate) {
        let count = 0;
        if (predicate) {
            for (let value of this) {
                if (predicate(value)) {
                    count++;
                }
            }
        }
        else if (this._target && this._target[Constant.CONST_LENGTH]) {
            count = this._target[Constant.CONST_LENGTH];
        }
        else {
            for (let value of this) {
                count++;
            }
        }
        return count;
    }
    Max(transform = Constant.selfFn) {
        let value, max, hasValue = false;
        for (let item of this) {
            value = transform(item);
            if (hasValue) {
                if (max < value)
                    max = value;
            }
            else {
                max = value;
                hasValue = true;
            }
        }
        if (!hasValue)
            throw Constant.CONST_NO_ELEMENTS;
        return max;
    }
    Min(transform = Constant.selfFn) {
        let value, min, hasValue = false;
        for (let item of this) {
            value = transform(item);
            if (hasValue) {
                if (min > value)
                    min = value;
            }
            else {
                min = value;
                hasValue = true;
            }
        }
        if (!hasValue)
            throw Constant.CONST_NO_ELEMENTS;
        return min;
    }
    ElementAt(index) {
        if (Array.isArray(this._target)) {
            if (0 > index ||
                this._target[Constant.CONST_LENGTH] <= index) {
                throw Constant.CONST_OUTOFRANGE;
            }
            return this._target[index];
        }
        let count = 0;
        for (let value of this) {
            if (index > count++) {
                continue;
            }
            return value;
        }
        throw Constant.CONST_OUTOFRANGE;
    }
    ElementAtOrDefault(index) {
        if (Array.isArray(this._target)) {
            let length = this._target[Constant.CONST_LENGTH];
            if (0 > index || length <= index) {
                let value = this._target[0];
                return 0 < length
                    ? Constant.getDefaultVal(typeof (value), value)
                    : undefined;
            }
            return this._target[index];
        }
        let value, count = 0;
        for (let item of this) {
            if (index === count++) {
                return item;
            }
            value = item;
        }
        return Constant.getDefaultVal(typeof value, value); // Last good value
    }
    First(predicate = Constant.trueFn) {
        for (let value of this) {
            if (predicate(value)) {
                return value;
            }
        }
        throw Constant.CONST_NOTHING_FOUND;
    }
    FirstOrDefault(predicate = Constant.trueFn) {
        let value;
        for (let item of this) {
            value = item;
            if (predicate(item)) {
                return item;
            }
        }
        return Constant.getDefaultVal(typeof value); // Last good value
    }
    Last(predicate = Constant.trueFn) {
        let value, found = false;
        for (let item of this) {
            if (predicate(item)) {
                value = item;
                found = true;
            }
        }
        if (!found) {
            throw Constant.CONST_NOTHING_FOUND;
        }
        return value;
    }
    LastOrDefault(predicate = Constant.trueFn) {
        let value, lastKnown, found = false;
        for (let item of this) {
            if (predicate(item)) {
                value = item;
                found = true;
            }
            lastKnown = item;
        }
        return (found) ? value : Constant.getDefaultVal(typeof lastKnown);
    }
    SequenceEqual(other, equal = (a, b) => a === b) {
        let res1, res2;
        let it1 = this[Symbol.iterator]();
        let it2 = other[Symbol.iterator]();
        while (true) {
            res1 = it1.next();
            res2 = it2.next();
            if (res1.done && res2.done)
                return true;
            if ((res1.done != res2.done) || !equal(res1.value, res2.value)) {
                return false;
            }
        }
        ;
    }
    Single(predicate = Constant.trueFn) {
        let value, hasValue = false;
        for (let item of this) {
            if (predicate(item)) {
                if (!hasValue) {
                    value = item;
                    hasValue = true;
                }
                else {
                    throw Constant.CONST_TOO_MANY;
                }
            }
        }
        if (hasValue)
            return value;
        throw Constant.CONST_NOTHING_FOUND;
    }
    SingleOrDefault(predicate = Constant.trueFn) {
        let value, lastKnown, hasValue = false;
        for (let item of this) {
            if (predicate(item)) {
                if (!hasValue) {
                    value = item;
                    hasValue = true;
                }
                else {
                    throw Constant.CONST_TOO_MANY;
                }
            }
            lastKnown = item;
        }
        return (hasValue) ? value : Constant.getDefaultVal(typeof lastKnown);
    }
    Sum(transform = Constant.selfFn) {
        let sum = 0;
        for (let value of this) {
            sum += transform(value);
        }
        return sum;
    }
    ToArray() {
        let array = [];
        for (let value of this) {
            array.push(value);
        }
        return array;
    }
    ToMap(keySelector, elementSelector = Constant.selfFn) {
        let dictionary = new Map();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }
    ToDictionary(keySelector, elementSelector = Constant.selfFn) {
        let dictionary = new Map();
        for (let value of this) {
            dictionary.set(keySelector(value), elementSelector(value));
        }
        return dictionary;
    }
    Cast() {
        // TODO: Remove any once TypeScript 2.0 out
        return this;
    }
    //-------------------------------------------------------------------------
    //  Deferred execution methods
    //-------------------------------------------------------------------------
    DefaultIfEmpty(defaultValue = undefined) {
        return new EnumerableImpl(undefined, Generator.DefaultIfEmpty, [this, defaultValue]);
    }
    Concat(second) {
        return new EnumerableImpl(undefined, Generator.Concat, [this, second]);
    }
    ChunkBy(keySelect, elementSelector = Constant.selfFn, resultSelector = (a, b) => b) {
        return new EnumerableImpl(undefined, Generator.ChunkBy, [this, keySelect, elementSelector, resultSelector]);
    }
    Distinct(keySelector) {
        if (keySelector)
            return new EnumerableImpl(undefined, Generator.Distinct, [this, keySelector]);
        return new EnumerableImpl(undefined, Generator.DistinctFast, [this]);
    }
    Except(other, keySelector) {
        return new EnumerableImpl(undefined, Generator.Intersect, [this, Constant.getKeys(other, keySelector), true, keySelector]);
    }
    GroupBy(selKey, selElement = Constant.selfFn, selResult = Constant.defGrouping) {
        let map = Constant.getKeyedMap(this, selKey, selElement);
        return new EnumerableImpl(undefined, Generator.GroupBy, [map, selResult]);
    }
    GroupJoin(inner, oKeySelect, iKeySelect, resultSelector = Constant.defGrouping) {
        return new EnumerableImpl(undefined, Generator.GroupJoin, [this, oKeySelect, resultSelector,
            Constant.getKeyedMapFast(inner, iKeySelect)]);
    }
    Intersect(other, keySelector) {
        return new EnumerableImpl(undefined, Generator.Intersect, [this,
            Constant.getKeys(other, keySelector),
            false, keySelector]);
    }
    Join(inner, oSelector, iSelector, transform) {
        return new EnumerableImpl(undefined, Generator.Join, [this, oSelector, transform, Constant.getKeyedMapFast(inner, iSelector)]);
    }
    OfType(obj) {
        let typeName;
        switch (obj) {
            case Number:
                typeName = Constant.CONST_NUMBER;
                break;
            case Boolean:
                typeName = Constant.CONST_BOOLEAN;
                break;
            case String:
                typeName = Constant.CONST_STRING;
                break;
            case Symbol:
                typeName = Constant.CONST_SYMBOL;
                break;
            default:
                typeName = undefined;
        }
        return new EnumerableImpl(undefined, Generator.OfType, [this, obj, typeName]);
    }
    OrderBy(keySelect, equal) {
        return new OrderedLinq(this, (array) => Generator.Forward(array), keySelect, equal);
    }
    OrderByDescending(keySelect, equal) {
        return new OrderedLinq(this, (array) => Generator.Reverse(array), keySelect, equal, true);
    }
    Range(start, count) {
        return new EnumerableImpl(undefined, Generator.Range, [start, count]);
    }
    Repeat(element, count) {
        return new EnumerableImpl(undefined, Generator.Repeat, [element, count]);
    }
    Reverse() {
        let array = Array.isArray(this._target)
            ? this._target : this.ToArray();
        return new EnumerableImpl(undefined, Generator.Reverse, [array]);
    }
    Select(transform) {
        return new EnumerableImpl(undefined, Generator.Select, [this, transform]);
    }
    SelectMany(selector = Constant.selfFn, result = (x, s) => s) {
        return new EnumerableImpl(undefined, Generator.SelectMany, [this, selector, result]);
    }
    Skip(skip) {
        return new EnumerableImpl(undefined, Generator.Skip, [this, skip]);
    }
    SkipWhile(predicate) {
        return new EnumerableImpl(undefined, Generator.SkipWhile, [this, predicate]);
    }
    Take(take) {
        return new EnumerableImpl(undefined, Generator.TakeWhile, [this, (a, n) => take > n]);
    }
    TakeWhile(predicate) {
        return new EnumerableImpl(undefined, Generator.TakeWhile, [this, predicate]);
    }
    Union(second, keySelector) {
        if (keySelector)
            return new EnumerableImpl(undefined, Generator.Union, [this, second, keySelector]);
        return new EnumerableImpl(undefined, Generator.UnionFast, [this, second]);
    }
    Where(predicate = Constant.trueFn) {
        return new EnumerableImpl(undefined, Generator.Where, [this, predicate]);
    }
    Zip(second, func) {
        return new EnumerableImpl(undefined, Generator.Zip, [this, second, func]);
    }
}
class OrderedLinq extends EnumerableImpl {
    constructor(target, factory, keySelect, equal, reversed = false) {
        super(target, factory);
        this.reversed = reversed;
        if (keySelect) {
            this.comparer = equal ? (a, b) => equal(keySelect(a), keySelect(b))
                : (a, b) => Constant.defCompare(keySelect(a), keySelect(b));
        }
        else {
            this.comparer = equal;
        }
        this['thenBy'] = this.ThenBy;
        this['thenByDescending'] = this.ThenByDescending;
    }
    [Symbol.iterator]() {
        if (!this._factoryArg) {
            this._factoryArg = this._target.ToArray();
            if (this.comparer) {
                this._factoryArg.sort(this.comparer);
            }
            else {
                this._factoryArg.sort();
            }
        }
        return this._factory(this._factoryArg);
    }
    ThenBy(keySelect, equal) {
        if (!keySelect && !equal)
            return this;
        var compare = keySelect ? equal ? (a, b) => equal(keySelect(a), keySelect(b))
            : (a, b) => Constant.defCompare(keySelect(a), keySelect(b))
            : equal;
        if (!this.comparer) {
            this.comparer = compare;
        }
        else {
            let superEqual = this.comparer;
            this.comparer = (a, b) => {
                let result = superEqual(a, b);
                return (0 != result) ? result : this.reversed ? -compare(a, b) : compare(a, b);
            };
        }
        return this;
    }
    ThenByDescending(keySelect, equal) {
        if (!keySelect && !equal)
            return this;
        var compare = keySelect ? equal ? (a, b) => equal(keySelect(a), keySelect(b))
            : (a, b) => Constant.defCompare(keySelect(a), keySelect(b))
            : equal;
        if (!this.comparer) {
            this.comparer = compare;
        }
        else {
            let superEqual = this.comparer;
            this.comparer = (a, b) => {
                let result = superEqual(a, b);
                return (0 != result) ? result : this.reversed ? compare(a, b) : -compare(a, b);
            };
        }
        return this;
    }
}
/** Copyright (c) ENikS.  All rights reserved. */

},{"./generators":1,"./iterators":2,"./utilities":4}],4:[function(require,module,exports){
"use strict";
///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0  ( the  "License" );  you may 
// not use this file except in compliance with the License.  You may  obtain  a 
// copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required  by  applicable  law  or  agreed  to  in  writing,  software 
// distributed under the License is distributed on an "AS  IS"  BASIS,  WITHOUT
// WARRANTIES OR CONDITIONS  OF  ANY  KIND, either express or implied.  See the 
// License for the specific  language  governing  permissions  and  limitations 
// under the License.
Object.defineProperty(exports, "__esModule", { value: true });
//-----------------------------------------------------------------------------
// Utility Functions
//-----------------------------------------------------------------------------
/** Default predicate, always true */
exports.trueFn = () => true;
/** Default transformer, returns self */
exports.selfFn = (o) => o;
/** Default Grouping */
exports.defGrouping = (a, b) => {
    if (!b[exports.CONST_KEY]) {
        b[exports.CONST_KEY] = a;
    }
    return b;
};
exports.defCompare = (a, b) => {
    return a == b ? 0 : a > b ? 1 : -1;
};
/** Returns default value for the type */
function getDefaultVal(type, value = undefined) {
    if (typeof type !== exports.CONST_STRING)
        throw new TypeError(exports.CONST_NO_STRING);
    // Handle simple types (primitives and plain function/object)
    switch (type) {
        case exports.CONST_BOOLEAN: return false;
        case exports.CONST_NUMBER: return 0;
        case exports.CONST_OBJECT: return null === value ? null : undefined;
        case exports.CONST_STRING: return exports.CONST_EMPTY_STRING;
        case exports.CONST_SYMBOL: return Symbol();
    }
    return undefined;
}
exports.getDefaultVal = getDefaultVal;
/** Returns a map of element bsed on extracted keys  **/
function getKeyedMap(iterable, keySelector, selElement = exports.selfFn) {
    let map = new Map();
    for (let value of iterable) {
        let key = keySelector(value);
        if (!key)
            continue;
        let group = map.get(key);
        if (!group) {
            group = [];
            map.set(key, group);
        }
        group.push(selElement(value));
    }
    return map;
}
exports.getKeyedMap = getKeyedMap;
function getKeyedMapFast(iterable, keySelector) {
    let map = new Map();
    for (let value of iterable) {
        let key = keySelector(value);
        if (!key)
            continue;
        let group = map.get(key);
        if (!group) {
            group = [];
            map.set(key, group);
        }
        group.push(value);
    }
    return map;
}
exports.getKeyedMapFast = getKeyedMapFast;
function getKeys(iterable, keySelector) {
    let set = new Set();
    if (keySelector) {
        for (let value of iterable) {
            let key = keySelector(value);
            if (!key)
                continue;
            set.add(key);
        }
    }
    else {
        for (let value of iterable) {
            if (!value)
                continue;
            set.add(value);
        }
    }
    return set;
}
exports.getKeys = getKeys;
//-----------------------------------------------------------------------------
//  Constants
//-----------------------------------------------------------------------------
exports.CONST_INVALID_KEY = "Key selector returned undefined Key";
exports.CONST_NO_STRING = "Type must be a string.";
exports.CONST_DUPLICATE = "Object already has property [key]";
exports.CONST_NOTHING_FOUND = "No element satisfies the condition in predicate";
exports.CONST_NO_ELEMENTS = "The source sequence is empty.";
exports.CONST_TOO_MANY = "More than one element satisfies the condition in predicate.";
exports.CONST_OUTOFRANGE = "Argument Out Of Range";
exports.CONST_KEY = "key";
exports.CONST_UNDEFINED = "undefined";
exports.CONST_LENGTH = "length";
exports.CONST_FUNCTION = "function";
exports.CONST_BOOLEAN = "boolean";
exports.CONST_NUMBER = "number";
exports.CONST_OBJECT = "object";
exports.CONST_STRING = "string";
exports.CONST_SYMBOL = "symbol";
exports.CONST_EMPTY_STRING = "";
/** Copyright (c) ENikS.  All rights reserved. */

},{}]},{},[3])(3)
});
