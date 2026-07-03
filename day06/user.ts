interface User{
    name: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
}

let adminUser: User={
    name:"Kamal",
    email:"kamal@test.com",
    password:"Test@123",
    role: "admin",
    isActive: true,
};

let standardUser: User = {
    name: "Sara",
    email: "sara@test.com",
    password: "User@123",
    role: "standard",
    isActive: true
};

let lockedUser: User = {
    name: "John",
    email: "john@test.com",
    password: "Lock@123",
    role: "standard",
    isActive: false
};

let allUsers: User[]=[adminUser,standardUser,lockedUser];

console.log("All users:");
for (let user of allUsers){
    console.log(`${user.name},${user.role},${user.isActive}`);
    
}

let activeUser = allUsers.filter(u => u.isActive===true);
console.log("The active users are:",activeUser.length);

let inActiveUser = allUsers.filter(u => u.isActive===false)
console.log("The Inactive user count is:",inActiveUser.length);

let role = allUsers.filter(u => u.role==="admin")
console.log("The Admin user count is:",role.length);

let Adminrole = allUsers.find(u => u.role==="admin")
if(Adminrole){
    console.log("Admin user found:",Adminrole.name);
    
}