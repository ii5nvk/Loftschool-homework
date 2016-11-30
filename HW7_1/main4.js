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
    tr.setAttribute("id", cookieName);
    tr.innerHTML = `<td>${cookieName}</td><td>${cookieValue}</td><td><button data-name='${cookieName}'>Удалить</button></td>`;
    tr.style.cssText = "padding:20px;\
        border:1px solid #ccc;\
  ";
    table.appendChild(tr);
    return true;
}

function createTable(obj) {
    var table = document.createElement('table');
    table.setAttribute("id", "table");
    document.body.appendChild(table);
    table.style.cssText = "background-color:#fff;\
    z-index:1000;\
     position:fixed; \
     top:0;left:0; \
  ";
    for (var item in obj) {
        addCookie(item, obj[item]);
    }
    return true;
}
createTable(getCookie());


document.addEventListener('click', function(e) {
    e.preventDefault();
    var target = e.target,
        nameCookie = target.getAttribute('data-name'),
        delTr = document.getElementById(nameCookie);
    if (target.tagName != "BUTTON") {
        return;
    }
    if (confirm('Удалить cookie с именем' + nameCookie + '?')) {
        delCookie(nameCookie);
        table.removeChild(delTr);
    }

});


function delCookie(cookieName) {
    var cookieDate = new Date('01/01/1970');
    document.cookie = cookieName + '=""; expires=' + cookieDate.toGMTString() + '; path=/';
    return true;
};