var container = document.querySelector('.container'),
    newElement = document.querySelector('.element');

function prependFn(containerElement, newElement){
    containerElement.insertBefore(newElement, containerElement.firstElementChild);
    newElement.innerHTML = 'Элемент в контейнере';
}

prependFn(container, newElement);