 new Promise(resolve => {
     if (document.readyState == 'complete') {
         resolve();
     } else {
         window.onload = resolve;
     }
 }).then(function() {
     return new Promise((resolve, reject) => {
         VK.init({apiId: 5781655});
         VK.Auth.login(function(response) {
             if (response.session) {
                 resolve(response);
             } else {
                 reject(new Error('Ошибка авторизации'));
             }
         });
     });
 }).then(function() {
     return new Promise((resolve, reject) => {
         VK.api('friends.get', {
             'fields': 'photo_100, bdate'
         }, serverAnswer => {
             if (serverAnswer.error) {
                 reject(new Error('error'));
             } else {
                 var friends = serverAnswer.response;
                 resolve(friends);
             }
         });
     });
 }).then(friends => {

     friends.sort(compareBDate); //coртировка массива по датам рождения

     for (let friend of friends) {
         if (friend.bdate) {
             if (friend.bdate.length > 7) {
                 friend.age = getAge(friend.bdate);
             } else {
                 friend.age = 'нет данных';
             }
         } else {
             friend.age = 'нет данных';
             friend.bdate = 'нет данных';
         }
     }


     Render(friends); // вывод результатов

/*-----------Функция сравнения по датам рождения ---------*/
     function compareBDate(a, b) {

         let nowTime = new Date().setFullYear(2000);
         let aTime, bTime;

         if (!a.bdate) {
             aTime = new Date().setFullYear(2002)
         } else {
             aTime = (nowTime.valueOf() < getDateFormat(a.bdate).setFullYear(2000).valueOf()) ? getDateFormat(a.bdate).setFullYear(2000) : getDateFormat(a.bdate).setFullYear(2001);
         }

         if (!b.bdate) {
             bTime = new Date().setFullYear(2002)
         } else {
             bTime = (nowTime.valueOf() < getDateFormat(b.bdate).setFullYear(2000).valueOf()) ? getDateFormat(b.bdate).setFullYear(2000) : getDateFormat(b.bdate).setFullYear(2001);
         }

         if (aTime - nowTime > bTime - nowTime) return 1;
         if (aTime - nowTime < bTime - nowTime) return -1;

     }
/*-----------Получение даты рождения в формате Date ---------*/
     function getDateFormat(bdate) {
         let bdateArray = bdate.split('.');
         let birthDate = new Date;
         if (bdateArray.length == 2) {
             birthDate.setMonth(bdateArray[1] - 1);
             birthDate.setDate(bdateArray[0]);
             birthDate.setFullYear(2000);

         } else {

             birthDate.setFullYear(bdateArray[2]);
             birthDate.setMonth(bdateArray[1] - 1);
             birthDate.setDate(bdateArray[0]);
         }
         return birthDate = new Date(birthDate);

     }

/*----------Получение возраста ---------*/
     function getAge(bdate) {
         let nowDate = new Date();
         let age = nowDate.getFullYear() - getDateFormat(bdate).getFullYear();
         return nowDate.setFullYear(2000).valueOf() < getDateFormat(bdate).setFullYear(2000).valueOf() ? (age - 1) : age;
     }

/*----------Вывод данных---------*/
     function Render(data) {
         let container = document.getElementById('container');
         let source = friendTemplate.innerHTML;
         let templateFn = Handlebars.compile(source);
         let template = templateFn({list: data});
         container.innerHTML += template;
     }

 });