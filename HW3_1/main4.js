var myArray = [1, 2, 3, 4, 5];

// Аналог метода forEach
function forEach(array, actionFn) {
    for (var item of array) {
        actionFn(item);
    }
}
forEach(myArray, item => console.log(item));


// Аналог метода filter
function filterFn(array, actionFn) {
    var filterArray = [],
        i = 0;
    for (var item of array) {
        if (actionFn(item)) {
            filterArray[i] = item;
            i++;
        }
    }
    return filterArray;
}
console.log(filterFn(myArray, item => item > 3));


// Аналог метода map
function mapFn(array, actionFn) {
    var mapArray = [],
        i = 0;
    for (var item of array) {
        mapArray[i] = actionFn(item);
        i++;
    }
    return mapArray;
}
console.log(mapFn(myArray, item => item * item));


// Аналог метода slice
function sliceFn(array, begin, end) {
    var sliceArray = [],
        num = 0,
        beginPosition = getBeginPosition(begin, array.length),
        endPosition = getEndPosition(end, array.length);

    for (var i = beginPosition; i < endPosition; i++) {
        sliceArray[num] = array[i];
        num++;
    }
    return sliceArray;
}

function getBeginPosition(value, length) {
    var result = 0;
    if (!value) {
        return result;
    }
    if (value < 0) {
        return result = length + value;
    } else if (value > length) {
        return value = length;
    } else {
        return result = value;
    }
}

function getEndPosition(value, length) {
    var result = 0;
    if (!value) {
        return result = length;
    } else {
        return result = value;
    }
}

console.log(sliceFn(myArray, 1, 4));
console.log(sliceFn(myArray, -1));
console.log(sliceFn(myArray));


// Аналог метода reduce
function reduceFn(array, callback, initialValue) {
    var index, previousValue;
    var max = array.length;

    if (!initialValue) {
        index = 1;
        previousValue = array[0];
    } else {
        previousValue = initialValue;
        index = 0;
    }

    for (var index; index < max; index++) {
        previousValue = callback(previousValue, array[index], index, array);
    }
    return previousValue;
}

function foo(prevSum, curNum) {
    return prevSum + curNum;
}

console.log(reduceFn(myArray, foo, 0));


// Аналог метода splice
function spliceFn(array, start, deleteCount) {

    var max = array.length,
        deletedArray = [],
        leftArray = [],
        num = 0,
        leftnum = 0,
        n = 0;

    var startPosition = getBeginPosition(start, max),
        deleteNumber = getDeleteNumber(deleteCount, startPosition, max),
        endPosition = startPosition + deleteNumber;

    for (var i = startPosition; i < endPosition; i++) {
        deletedArray[num] = array[i];
        num++;
    }

    for (var i = endPosition; i < max; i++) {
        leftArray[leftnum] = array[i];
        leftnum++;
    }

    if (arguments.length > 3) {
        k = startPosition;
        for (var i = 3; i < arguments.length; i++) {
            array[k] = arguments[i];
            k++;
        }
    }

    for (var i = startPosition + arguments.length - 3; i < max + arguments.length - 3; i++) {
        array[i] = leftArray[n];
        n++;
    }

    array.length = max + arguments.length - 3 - deleteNumber;
    return deletedArray;
}

function getDeleteNumber(value, start, length) {
    var result = 0;
    if (!value) {
        return result = length - start;
    } else if (value > length - start) {
        return value = length - start;
    } else {
        return result = value;
    }
}

console.log(spliceFn(myArray, -1, 2, 7));
console.log(myArray);