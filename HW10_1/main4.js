/*======================= ES 5 ==============================*/
function inherit(child, parent){
   child.prototype = Object.create(parent.prototype);
   child.prototype.constructor = child;
   child.prototype.parent=parent;
}

var Calc = function(number) {
    this.number = number;
}

Calc.prototype.fnSum = function(number) {
   let args = Array.prototype.slice.call(arguments);
      return args.reduce(function(prev,cur){
        return prev + cur;
    }, this.number);
}

Calc.prototype.fnDif = function (number){
    let args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prev,cur){
        return prev - cur;
    }, this.number);
}

Calc.prototype.fnDiv = function(number) {
    let args = Array.prototype.slice.call(arguments);

    return args.reduce(function(prev,cur){

        if (cur === 0){
            throw new Error('DIVIDE__ZERO'); 
        }
        return prev/cur;

    }, this.number);
}

Calc.prototype.fnMul = function (number){
    let args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prev,cur){
        return prev*cur;
    }, this.number);
}

var SqlCalc = function(number) {
    Calc.call(this, number);
}

inherit(SqlCalc, Calc);

SqlCalc.prototype.fnSqlSum = function(number){
    return Math.pow(this.parent.prototype.fnSum.apply(this, arguments), 2);
}

SqlCalc.prototype.fnSqlDif = function(number){
    return Math.pow(this.parent.prototype.fnDif.apply(this, arguments), 2);
}
SqlCalc.prototype.fnSqlDiv = function(number){
    return Math.pow(this.parent.prototype.fnDiv.apply(this, arguments), 2);
}

SqlCalc.prototype.fnSqlMul = function(number){
    return Math.pow(this.parent.prototype.fnMul.apply(this, arguments), 2);
}





/*======================= ES 6 ==============================*/


class Calc {
    constructor(number) {
        this.number = number;
    }
    fnSum(number) {
        let args = Array.prototype.slice.call(arguments);
        return args.reduce(function(prev, cur) {
            return prev + cur;
        }, this.number);
    }
    fnDif(number) {
        let args = Array.prototype.slice.call(arguments);
        return args.reduce(function(prev, cur) {
            return prev - cur;
        }, this.number);

    }
    fnDiv(number) {
        let args = Array.prototype.slice.call(arguments);

        return args.reduce(function(prev, cur) {

            if (cur === 0) {
                throw new Error('DIVIDE__ZERO');
            }
            return prev / cur;

        }, this.number);
    }
    fnMul(number) {
        let args = Array.prototype.slice.call(arguments);
        return args.reduce(function(prev, cur) {
            return prev * cur;
        }, this.number);
    }
}


class SqlCalc extends Calc {
    constructor(number) {
        super(number);
    }
    fnSqlSum(number) {
        return Math.pow(super.fnSum.apply(this, arguments), 2);
    }

    fnSqlDif(number) {
        return Math.pow(super.fnDif.apply(this, arguments), 2);
    }
    fnSqlDiv(number) {
        return Math.pow(super.fnDiv.apply(this, arguments), 2);
    }

    fnSqlMul(number) {
        return Math.pow(super.fnMul.apply(this, arguments), 2);
    }

}


let myCalc = new SqlCalc(100);

console.log(myCalc.fnSqlSum(1, 2, 3));
console.log(myCalc.fnSqlDif(10, 20)); 
console.log(myCalc.fnSqlDiv(2, 2)); 
console.log(myCalc.fnSqlMul(2, 2)); 





