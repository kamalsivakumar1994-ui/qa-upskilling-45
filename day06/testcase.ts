interface TestCase {
    id: string;
    title: string;
    status: string;
    priority: string;
}

let tc1: TestCase = {
    id: "TC001",
    title: "Login with valid credentials",
    status: "Pass",
    priority: "High"
};

let tc2: TestCase = {
    id: "TC002",
    title: "Login with wrong password",
    status: "Fail",
    priority: "High"
};

let tc3: TestCase = {
    id: "TC003",
    title: "Login with empty username",
    status: "Pass",
    priority: "Medium"
};

console.log("All test cases:");
console.log(tc1);
console.log(tc2);
console.log(tc3);

console.log("─────────────────");

console.log("First test case ID:", tc1.id);
console.log("First test case status:", tc1.status);

console.log("─────────────────");

let allTests: TestCase[] = [tc1, tc2, tc3];
console.log("Total tests:", allTests.length);

let failedTests = allTests.filter(tc => tc.status === "Fail");
console.log("Failed tests:", failedTests.length);

let firstFailed = allTests.find(tc => tc.status === "Fail");

if (firstFailed) {
    console.log("Failed test ID:", firstFailed.id);
    console.log("Failed test title:", firstFailed.title);
}