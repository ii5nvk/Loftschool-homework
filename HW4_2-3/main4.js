var container = document.querySelector('.container');
   
//удаление текстовых узлов
function deleteTextNodes(containerElement){
 var allChildren = containerElement.childNodes;
 for (var i=0; i < allChildren.length; i++ ){
 	if (allChildren[i].nodeType == 3){
 		container.removeChild(allChildren[i]);
 		i--;
 	}
 }
}

deleteTextNodes(container); 


//удаление текстовых узлов рекурсивно
function deleteTextNodesRec(containerElement){

 for (var i = 0; i < containerElement.childNodes.length; i++ ){
 	 if ( containerElement.childNodes[i].nodeType == 3){
 		containerElement.removeChild(containerElement.childNodes[i]);
 		i--;
 	}
 	else if ( containerElement.childNodes[i].nodeType == 1){
 	 		deleteTextNodesRec( containerElement.childNodes[i]);
 	} 
 }
}
deleteTextNodesRec(container);


