document.addEventListener('click', createBlock);

//создание блока
function createBlock(e) {
    if (e.target.tagName == 'BODY') {
        var div = document.createElement('div');
        document.body.appendChild(div);

        div.style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ')';
        div.style.width = Math.floor(Math.random() * (300)) + 'px';
        div.style.height = Math.floor(Math.random() * (300)) + 'px';
        div.style.left = Math.floor(Math.random() * (document.body.clientWidth - div.clientWidth)) + 'px';
        div.style.top = Math.floor(Math.random() * (document.body.clientHeight - div.clientHeight)) + 'px';
    }
}

var dragObject = {};
document.addEventListener('mousedown', dragBlock);
document.addEventListener('mousemove', moveBlock);
document.addEventListener('mouseup', dropBlock);
//обработка при событии mousedown
function dragBlock(e) {
    if (e.target.tagName == 'DIV') {
        e.target.style.zIndex = 10;
        dragObject.shiftX = e.pageX - getCoords(e.target).left;
        dragObject.shiftY = e.pageY - getCoords(e.target).top;
        dragObject.elem = e.target;
    }
}
//обработка при событии mousemove
function moveBlock(e) {
    if (!dragObject.elem) return;
    dragObject.elem.style.left = e.pageX - dragObject.shiftX + 'px';
    dragObject.elem.style.top = e.pageY - dragObject.shiftY + 'px';
}
//обработка при событии mouseup
function dropBlock(e) {
    if (!dragObject.elem) return;
    e.target.style.zIndex = 1;
    dragObject = {};
}
//получение координат блока
function getCoords(elem) {
    var block = elem.getBoundingClientRect();
    return {
        top: block.top + window.pageYOffset,
        left: block.left + window.pageXOffset
    };
}
