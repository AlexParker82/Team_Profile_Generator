const Manager = require('../lib/manager');

describe("Manager class", () => {
    it("should set name, set id, set email and set office number and get name, get id, get email, get office number and get role", () => {
        const name = "Bill";
        const id = 25;
        const email = "bill@gmail.com";
        const role = "Manager";
        const office = 3;
        const bill = new Manager(id, name, email, office);
        expect(bill.getName()).toBe(name);
        expect(bill.getId()).toBe(id);
        expect(bill.getEmail()).toBe(email);
        expect(bill.getOffice()).toBe(office);
        expect(bill.getRole()).toBe(role);
    })
});