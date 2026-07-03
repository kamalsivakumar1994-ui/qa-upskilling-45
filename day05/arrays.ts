let users: string[] =["admin","standard_user","locked_user"]

console.log(`"All users:" ${users}`);
console.log("Total:",users.length);
console.log("First user:",users[0]);
console.log("Has locked user:",users.includes("locked_user"));;

let activeOnly = users.filter(u=> u!== ("locked_user"));
console.log("Active user:",activeOnly);

let found = users.find(u=>u.startsWith("admin"));
console.log("Found:",found);

let Uppercase=users.map(u=> u.toUpperCase());
console.log("Uppercase:",Uppercase);





