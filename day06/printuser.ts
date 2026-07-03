interface User{
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}

function printUserDetails(user:User):void{
     console.log("─────────────────────");
     console.log("Name:",user.name);
     console.log("Email:",user.email);
     console.log("Role    :", user.role);
     console.log("Active  :", user.isActive);
     console.log("─────────────────────");    
     
}

function isUserActive(user:User):boolean{
    return user.isActive
}

function getUserSummary(user:User): string{
    if(user.isActive){
        return `${user.name} is a ${user.role} and is active`
    }
      else{
        return `${user.name} is a ${user.role} and is locked`
      }

    }
let user1: User = {
    name: "Kamal",
    email: "kamal@test.com",
    role: "admin",
    isActive: true
};

let user2: User = {
    name: "John",
    email: "john@test.com",
    role: "standard",
    isActive: false
};

printUserDetails(user1);
printUserDetails(user2);

console.log("is kamal active", isUserActive(user1) );

console.log(getUserSummary(user2));

