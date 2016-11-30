function timer(sec){
    return promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(sec);
        }, sec);
    });
}

timer(5000).then((result) => console.log('я вывелась через '+ result/1000+ ' секунды'))

