# jest快速入门

`jest` 一个令人愉快的javascript测试框架。

## 安装

```bash
# 项目中使用
yarn init
yarn add --dev jest

# 全局安装
yarn global add jest
```

## 基础知识

### 命名规范

- 待测试文件：`hello.js`
- 待测试脚本文件：`hello.test.js` 或 `hello.spec.js`
- 测试目录：`__tests__` 或 `tests`

### 测试函数

```js
test("测试用例描述信息", () => {
    // TODO: ...
})
// or
it("测试用例描述信息", () => {
    // TODO: ...
})
```

### 断言函数

断言函数用于验证结果是否正确。

```js
exspect(实际运行结果).toBe(期望结果);
// 常见的断言方法
expect({ a: 1 }).toBe({ a: 1 }); // 判断两个对象是否相等，相当于 ===
expect(1).not.toBe(2); //判断不等
expect({ a: 1, foo: { b: 2 } }).toEqual({ a: 1, foo: { b: 2 } }) // toEqual是值相等
expect(value).toBeNull(); // is null
expect(value).toBeUndefined(); // is undefined
expect(value).toBeDefined(); // !undefined
expect(value).toBeTruthy(); // is true
expect(value).toBeFalsy(); // is false
expect(value).toBeGreaterThan(3); // is > 3
expect(value).toBeGreaterThanOrEqual(3.5) // is >= 3.4
expect(value).toBeLessThan(5) // is < 5
expect(value).toBeLessThanOrEqual(0.3); // is <= 0.3
expect(value).toBeCloseTo(0.3); // 判断浮点数相等
expect(value).toMatch(/###[^#]+/); // 正则表达式判断
expect([1, 2, 'a', 'b']).toContain('a'); // 数组包含
```

### 分组函数

```js
describe("关于每个功能或某个组件的单元测试", () => {
    //不同用例的单元测试
})
```

### 常见命令

```json
{
    "nocache": "jest --no-cache", // 清除缓存
    "watch": "jest --watchAll", // 实时监听
    "coverage": "jest --caverage", // 生成覆盖测试文档
    "verbose": "jest --verbose" // 显示测试描述
}
```

## 测试

### 异步测试

异步断言需要在单元测试函数设置`done`形参，在定时回调函数中调用，显示通过单元测试已完成。

```js
describe('异步测试', () => {
    const foo = (callback) => {
        console.log('foo..');
        setTimeout(() => {
            callback && callback();
        }, 1000);
    }

    test('异步测试', (done) => {
        function bar() {
            console.log('bar..');
            done();
        }
        foo(bar);
    })
});
```

jest提供两个方法`jest.useFakeTimers`和`jest.runAllTimers`可以更优雅的对延时功能进行测试。

```js
describe('定时器相关测试', () => {
    // 开启定时函数模拟
    jest.useFakeTimers();

    function foo(callback) {
        console.log('foo...')
        setTimeout(() => {
            callback && callback();
        }, 1000)
    }
    it('断言异步测试', () => {
        //创建mock函数，用于断言函数被执行或是执行次数的判断
        const callback = jest.fn();
        foo(callback);
        expect(callback).not.toBeCalled();
        //快进，使所有定时器回调
        jest.runAllTimers();
        expect(callback).toBeCalled();
    })
});
```

#### DOM测试

实现dom渲染测试，以及点击事件等交互功能测试。

```js
describe('Dom测试', () => {
    it('测试按钮是否被渲染 ', () => {
        document.body.innerHTML = `
    <div>
        <button id='btn'>小按钮</button>
    </div> `
        console.log(document.getElementById('btn'), document.getElementById('btn').toString())
        expect(document.getElementById('btn')).not.toBeNull();
        expect(document.getElementById('btn').toString()).toBe("[object HTMLButtonElement]");
    });

    it('测试点击事件', () => {
        const onclick = jest.fn();
        document.body.innerHTML = `
        <div>
            <button id='btn'>小按钮</button>
        </div> `
        const btn = document.getElementById('btn');
        expect(onclick).not.toBeCalled();
        btn.onclick = onclick;
        btn.click();
        expect(onclick).toBeCalled();
        expect(onclick).toHaveBeenCalledTimes(1);
        btn.click();
        btn.click();
        expect(onclick).toHaveBeenCalledTimes(3);
    });
});
```