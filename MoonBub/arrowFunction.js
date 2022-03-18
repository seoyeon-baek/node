printChar = function (문자){
    console.log('익명함수: ' + 문자);
}

printChar('a');

printArrow = 문자 => {console.log('화살표함수:',문자);}

printArrow('b');