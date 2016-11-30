function getCookie() {
    var cookieArray = document.cookie.split(';'),
        cookieObj = {};

    for (let i = 0; i < cookieArray.length; i++) {
        var nameCookie = cookieArray[i].split('=');
        nameCookie[0] = decodeURIComponent(nameCookie[0]);
        nameCookie[1] = decodeURIComponent(nameCookie[1]);
        cookieObj[nameCookie[0]] = nameCookie[1];
    }
    return cookieObj;
}

function addCookie(cookieName, cookieValue) {
    var table = document.getElementById('table'),
        tr = document.createElement('tr');
    cookieName = cookieName.trim();
    tr.setAttribute("id", cookieName);
    tr.innerHTML = `<td>${cookieName}</td><td>${cookieValue}</td><td><button data-name='${cookieName}'>Удалить</button></td>`;
    table.appendChild(tr);
    return true;
}

function createTable(obj) {
    for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
            addCookie(item, obj[item]);
        }
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    createTable(getCookie());
});

document.addEventListener('click', function(e) {
    e.preventDefault();
    var target = e.target,
        nameCookie = target.getAttribute('data-name'),
        delTr = document.getElementById(nameCookie),
        sub = document.getElementById('sub'),
        form = document.getElementById('form');
    if (target.tagName == "BUTTON") {
        if (confirm('Удалить cookie с именем ' + nameCookie + '?')) {
            delCookie(nameCookie);
            table.removeChild(delTr);
        }
    }
    else if (target.id == "sub") {
        var inputs = form.querySelectorAll('input[type=text]'),
            nameCookie = inputs[0].value,
            valueCookie = inputs[1].value;
      
            if ((inputs[0].value.trim() === "") || (inputs[1].value.trim() === "") || (inputs[2].value.trim() === "")){
                alert('Заполните все поля формы');
                return;
            }
      
        document.cookie = `${nameCookie}=${valueCookie}`;
        addCookie(nameCookie, valueCookie);
        inputs[0].value = inputs[1].value = inputs[2].value = '';
    }
});

function delCookie(cookieName) {
    var cookieDate = new Date('01/01/1970');
    document.cookie = cookieName + '=""; expires=' + cookieDate.toGMTString() + ';';
    return true;
};