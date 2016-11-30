function addCity(city) {
    var li = document.createElement('li');
    li.textContent = city;
    container.appendChild(li);
}

function getData(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.addEventListener('load', function() {
            resolve(xhr.responseText);
        });

        xhr.addEventListener('error', function() {
            reject();
        });

    });
}

function findPartial(a, s) {
    if (a.indexOf(s) >= 0)
        return true;
}


document.addEventListener("DOMContentLoaded", getInput);

function getInput() {
    var cities = {};
    getData('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then(
        function(result) {
            cities = JSON.parse(result);
        }).catch(function() {
        console.log('error');
    });


    var inputField = document.getElementById('city');
    container = document.getElementById('container');

    inputField.addEventListener('input', check);

    function check(e) {
        container.innerHTML = "";
        if (e.target.value) {
            for (let i = 0; i < cities.length; i++) {
                if (findPartial(cities[i].name, e.target.value)) {
                    addCity(cities[i].name);
                }
            }
        }
    }

}