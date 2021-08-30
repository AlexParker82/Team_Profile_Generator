const Engineer = require('../lib/engineer');

describe("Engineer class", () => {
    it("should set name, set id, set email and set Github username and get name, get id, get email, get Github username and get role", () => {
        const name = "Bill";
        const id = 25;
        const email = "bill@gmail.com";
        const role = "Engineer";
        const github = "Bill25";
        const bill = new Engineer(id, name, email, github);
        expect(bill.getName()).toBe(name);
        expect(bill.getId()).toBe(id);
        expect(bill.getEmail()).toBe(email);
        expect(bill.getGithub()).toBe(github);
        expect(bill.getRole()).toBe(role);

    })
});