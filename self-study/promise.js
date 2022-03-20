let myFirstPromise = new Promise((resolve, reject) => {
    setTimeout( function(){
        resolve('성공!')
    }, 2500)
})

myFirstPromise.then((successMessage) => { //successMessage는 resolve에서 호출에 제공한 값
    console.log("와!" + successMessage);
})