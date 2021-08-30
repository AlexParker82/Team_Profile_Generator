const Employee = require('../lib/employee');

describe("Employee class", () => {
    it("should set name, set id, set email and get name, get id, get email and get role", () => {
        const name = "Bill";
        const id = 25;
        const email = "bill@gmail.com"
        const role = "Employee";
        const bill = new Employee(id, name, email);
        expect(bill.getName()).toBe(name);
        expect(bill.getId()).toBe(id);
        expect(bill.getEmail()).toBe(email);
        expect(bill.getRole()).toBe(role);
    })
});