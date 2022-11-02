const sayHi = require('../src/hello');

describe("分组1", () => {
    test("输出hi", () => {
        expect(sayHi()).toBe('hi!');
    })
    
    test("toBe", () => {
        const obj = { a: 1 };
        expect({ a: 1 }).toBe(obj);
    });

});

describe("分组2", () => {
    test("toEqual", () => {
        const obj = { a: 1 };
        expect({ a: 1 }).toEqual(obj);
    });
});
