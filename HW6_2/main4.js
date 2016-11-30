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

function addCity(city) {
    var li = document.createElement('li'),
        container = document.getElementById('container');
    li.textContent = city;
    container.appendChild(li);
}

getData('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then(
    function(result) {
        var cities = JSON.parse(result);

        cities.sort(function(obj1, obj2) {
            if (obj1.name < obj2.name) return -1;
            if (obj1.name > obj2.name) return 1;
            return 0;
        });

        for (let city of cities) {
            addCity(city.name);
        }

    }).catch(function() {
    console.log('error');
});