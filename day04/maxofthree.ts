function maxOfThree(a: number, b: number, c: number):number{
    if(a >=b && a >=c){
        return a;
    }else if (b>=c)
    {
        return b;
    }else{
        return c;
    }
}

console.log(maxOfThree(10,11,12));
console.log(maxOfThree(123,102,84));
console.log(maxOfThree(147,999,45))

let biggest = maxOfThree(15,89,145);
console.log(`Biggest is: ${biggest}`);
