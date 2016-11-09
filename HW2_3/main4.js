function calculator(firstNumber){

	function fnSum(){
		var result = 0;
		for (var i = 0; i< arguments.length; i++){
           result += arguments[i];
		}
		return result + firstNumber;
	}

	function fnDif()	{
		var result = 0;
		for (var i = 0; i< arguments.length; i++){
           result +=arguments[i];
		}
		return  firstNumber - result;
	}

	function fnDiv()	{
		var result = firstNumber;
		for (var i = 0; i < arguments.length; i++){
		   if (arguments[i] == 0){
		   	  throw new Error ('DIVIDE__ZERO');
		   }
		   else {	
             result = result/arguments[i];
           }
		}
		return result;
	}

	function fnMul()	{
		var result = firstNumber;
		for (var i = 0; i < arguments.length; i++){
           result = result*arguments[i];
		}
		return result;
	}

  return  calc = {
	          sum : fnSum,
	          dif : fnDif,
	          div : fnDiv,
	          mul : fnMul
                  } 
} 

var myCalculator = calculator(100); 

console.log(myCalculator.sum(1, 2, 3)); 
console.log(myCalculator.dif(10, 20)); 
console.log(myCalculator.div(2, 2)); 
console.log(myCalculator.mul(2, 2));
  
try{
  console.log(myCalculator.div(2, 0)); 
} catch(e){
	if (e.message == "DIVIDE__ZERO") {console.log('на ноль делить нельзя');}
}