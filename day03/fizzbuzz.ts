let fizzcount: number =0;
let buzzcount: number =0;
for (let i=1;i<=30;i++){
    if (i%3===0 && i%5===0){
        console.log("FizzBuzz");
    }else if(i%3 ===0){
        console.log("Fizz");
        fizzcount++
    }else if(i%5===0){
        console.log("Buzz");
        buzzcount++;
    }else{
        console.log(i);
        
    }
}

console.log(`fizz appeared: ${fizzcount} times`);

console.log(`fizz appeared: ${buzzcount} times`);

