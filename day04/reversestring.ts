function reversedString(s: string): string{
    let reversed: string="";
    for(let i =s.length-1;i>=0;i--){
        reversed=reversed+s[i];

    }
return reversed;
}

console.log(reversedString("Kamal"));
   
let backward: string = reversedString("Automation");
console.log(`Reversed word: ${backward}`);
