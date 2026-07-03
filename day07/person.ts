class person{
    name: string;
    age: number;

    constructor(name:string,age:number)
{
    this.name=name;
    this.age=age;
}
greet():void{
    console.log(`hi my name is ${this.name} and age is ${this.age}`)
}
}
let person1=new person("kamal",32);
let person2=new person("Test",50);

person1.greet();
person2.greet();
