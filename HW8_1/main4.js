function getData(url) {
    return new Promise((resolve, reject)=> {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.addEventListener('load', ()=> {
            resolve(xhr.responseText);
        });

        xhr.addEventListener('error', ()=> {
            reject();
        });

    });
}

getData('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then(
    result => {
        var cities = JSON.parse(result);
        cities.sort((obj1, obj2) => {
            if (obj1.name < obj2.name) return -1;
            if (obj1.name > obj2.name) return 1;
            return 0;
        });

        Render(cities); //вывод списка городов

        inputField.addEventListener('input', check); //обработка зменения input

        function check(e) { 
     
                for (var city of cities) {
                   var cityId = document.getElementById(city.name);
                   if (!e.target.value == "" & findPartial(city.name.toLowerCase(), e.target.value.toLowerCase())) {
                      cityId.style.display = "block";
                   }
                    else if (e.target.value == ""){
                      cityId.style.display = "block";
                    }
                    else{
                      cityId.style.display = "none";
                   }
                }
        }


/*==================  Функция: проверка на совпадение символов======================*/
        function findPartial(a, s) {
            if (a.indexOf(s) >= 0)
                return true;
        }
/*==================  Функция: вывод шаблона======================*/
        function Render(cities) {
            let container = document.getElementById('container');
            let source = citiesTemplate.innerHTML;
            let templateFn = Handlebars.compile(source);
            let template = templateFn({
                list: cities
            });
            container.innerHTML += template;

        }


    }).catch(function() {
    console.log('error');
});