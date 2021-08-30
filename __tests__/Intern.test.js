const Intern = require('../lib/intern');

describe("Intern class", () => {
    it("should set name, set id, set email and set school and get name, get id, get email, get school and get role", () => {
        const name = "Bill";
        const id = 25;
        const email = "bill@gmail.com";
        const role = "Intern"
        const school = "UNH";
        const bill = new Intern(id, name, email, school);
        expect(bill.getName()).toBe(name);
        expect(bill.getId()).toBe(id);
        expect(bill.getEmail()).toBe(email);
        expect(bill.getSchool()).toBe(school);
        expect(bill.getRole()).toBe(role);
    })
});