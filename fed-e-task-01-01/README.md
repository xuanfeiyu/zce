# Part 1 · JavaScript 深度剖析

## 模块一 · 函数式编程与JS异步编程、手写Promise

## 简答题

### 一、谈谈你是如何理解JS异步编程的，EventLoop/消息队列都是做什么的，什么是宏任务，什么是微任务

- JavaScipt 采用单线程模式工作原因：与最早的设计初衷有关，最早 JavaScipt 这门语言是运行在浏览器中的脚本语言，目的是实现页面上的动态交互。而实现页面交互的核心是 DOM 操作，这也就决定了必须使用单线程，否则会出现复杂的线程同步问题。
- 单线程：JS 执行环境中负责执行代码的线程只有一个。
  - 优点：更安全、更简单。
  - 缺点：遇到耗时的任务，后面的任务需要排队等到这个任务的结束，导致程序被拖延，出现假死。

  为了解决耗时的问题，JavaScript 将任务的执行模式分成了两种：

- 同步模式（Synchronous）
  同步模式指的是代码中的任务依次执行，后一个任务必须要等到前一个任务结束才能够开始执行。
- 异步模式（Asynchronous）
  不会等待这个任务的结束才开始下一个任务。
  对于耗时任务都是开启过后就立即往后执行下一个任务，后续逻辑一般会通过回调函数的方式定义。
EventLoop：负责监听调用栈和消息队列
消息队列：如果说调用栈是正在执行的工作表，那么消息队列就可以理解为待办的工作表，JS 执行引擎就是先做完调用栈中所有的任务，然后通过事件循环在消息队列中再取出一个任务来继续执行，以此类推。

- 宏任务：回调队列中的任务
- 微任务：直接在当前任务结束过后立即执行，Promise 的回调会作为微任务执行  Promise&MutationObserver&process.nextTick

## 代码题

### 一、将下面的异步代码使用 Promise 的方式改进

```javascript
setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
        var b = 'lagou'
        setTimeout(function () {
            var c = 'I ❤ U'
            console.log(a + b + c)
        }, 10)
    }, 10)
}, 10)
```

### 二、基于以下代码完成下面的四个练习

```javascript
const fp = require('lodash/fp')
// 数据
// horsepower 马力， dollar_value 价格， in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true},
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false},
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false},
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false},
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true},
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false},
]

```

#### 练习1：使用函数组合fp.flowRight()重新实现下面这个函数

```javascript
let isLastInStock = function(cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car)
}
```

#### 练习2：使用 fp.flowRight()、fp.prop()和fp.first() 获取第一个 car 的 name

#### 练习3：使用帮助函数 _average 重构 averageDollarValue， 使用函数组合的方式实现

```javascript
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
} // <- 无须改动
let averageDollarValue = function(cars) {
    let dollar_values = fp.map(function(car){
        return car.dollar_value
    },cars)
    return _average(dollar_values)
}
```

#### 练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的 name 转换为这种形式：例如：sanitizeNames(["Hello World"]) => ["hello_world"]

```javascript
let _underscore = fp.replace(/\W+/g,'_') // <-- 无须改动，并在 sanitizeNames 中使用它
```

### 三、基于下面提供的代码，完成后续的四个练习

```javascript
// support.js
class Container {
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
}
class Maybe {
    static of(x){
        return new Maybe(x)
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
    constructor(x){
        this._value = x
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
module.exports = { Maybe, Container }
```

#### 练习1：使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1

```javascript
// app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
    // 你需要实现的函数。。。
}
```

#### 练习2：实现一个函数 ex2, 能够使用 fp.first 获取列表的第一个元素

```javascript
// app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
    // 你需要实现的函数。。。
}
```

#### 练习3：实现一个函数 ex3, 使用 safeProp 和 fp.first 找到 user 的名字的首字母

```javascript
// app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let safeProp = fp.curry(function(x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
    // 你需要实现的函数。。。
}
```

#### 练习4：使用 Maybe 重写 ex4， 不要有 if 语句

```javascript
// app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let ex4 = function(n) {
    if(n) {
        return parseInt(n)
    }
}
```

### 四、手写实现 MyPromise 源码

要求：尽可能还原 Promise 中的每一个API，并通过注释的方式描述思路和原理
