var allNumbers = [1, 2, 4, 5, 6, 7, 8],
someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
noNumbers = ['это', 'массив', 'без', 'чисел'],
emptyNumbers = [];

function isAllTrue(source, filterFn){
	var result = true,
	    max = source.length; 
	
	if (max == 0 ) {throw new Error ('EMPTY_ARRAY');} 
    else{
	for (var i = 0; i < max ; i++){
		if(!filterFn(source[i])) {return !result;}
   	}
    return result;
    }
}

function isNumber(val) {
  return typeof val === 'number';
}


console.log(isAllTrue(allNumbers, isNumber)); //вернет true
console.log(isAllTrue(someNumbers, isNumber)); //вернет false
console.log(isAllTrue(noNumbers, isNumber)); //вернет false

try{
console.log(isAllTrue(emptyNumbers, isNumber));
} catch(e){
	if (e.message == 'EMPTY_ARRAY'){
	console.log('массив пустой');
  }
} 

