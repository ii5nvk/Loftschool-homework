(function scanDom(){
 let body = document.querySelector('body'),
	 textObj = {text:0},   	
	 tagsObj = {},
	 classObj = {};
 
// Обход DOM и получение данных (рекурсивно) 
function getDataNode(elem){
	    var allNodes = elem.childNodes;

	    for (let i = 0; i < allNodes.length; i++){
            //тектовые узлы
	        if (allNodes[i].nodeType == 3){
            textObj.text++;
            }
            else if(allNodes[i].nodeType == 1){
            	getDataNode(allNodes[i]);
                //теги   
                let tagName = allNodes[i].tagName; 
                setObjValue(tagName, tagsObj);
                //классы
                let className = allNodes[i].classList;
                for (let i = 0; i < className.length; i++ ){
                 	setObjValue(className[i], classObj);
                } 
            }
        }
}
getDataNode(body);
// Формирование вывода статистики по элементам и классам на странице
 let exitText = 'Текстовых узлов : ' + textObj.text+ '\n';
 for (let prop in tagsObj){
	exitText += 'Тегов ' + prop.toLowerCase() + ' : '+ tagsObj[prop]+ '\n';
 }
 for (let prop in classObj){
	exitText += 'Элементов с классом ' + prop + ' : '+ classObj[prop] + '\n';
 }


// Формирование объекта
function setObjValue(prop, obj){
  if (prop in obj){
    obj[prop]++;
  }
  else{
    obj[prop] = 1;
  } 
}

 //Вывод в консоль результата
 console.log(exitText);   
})();





