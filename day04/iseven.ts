function isEven(n: number):boolean{
    if(n%2===0){
        return true;
    }else{
        return false;
    }

}

console.log(isEven(4));    // true
console.log(isEven(7));    // false
console.log(isEven(10));   // true
console.log(isEven(13));

let number: number =9;
if (isEven(number)){
    console.log("Even");
}
    else{
        console.log("odd");
        
    }
    
