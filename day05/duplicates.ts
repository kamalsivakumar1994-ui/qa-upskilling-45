function findDuplicates(items: string[]):string[]{
    let seen: string[] =[];
    let duplicates: string[]=[];

    for(let item of items){
        if(seen.includes(item)){
            duplicates.push(item)
        }else{
            seen.push(item);
        }
    }
return duplicates;
}
let testData: string[] = ["admin", "user1", "admin", "user2", "user1"];

console.log("All items:", testData);
console.log("Duplicates:", findDuplicates(testData));