// ### 三、基于下面提供的代码，完成后续的四个练习

// // support.js
// class Container {
//     static of(value) {
//         return new Container(value)
//     }
//     constructor(value) {
//         this._value = value
//     }
//     map(fn) {
//         return Container.of(fn(this._value))
//     }
// }
// class Maybe {
//     static of(x){
//         return new Maybe(x)
//     }
//     isNothing() {
//         return this._value === null || this._value === undefined
//     }
//     constructor(x){
//         this._value = x
//     }
//     map(fn) {
//         return this.isNothing() ? this : Maybe.of(fn(this._value))
//     }
// }
// module.exports = { Maybe, Container }

const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')


// #### 练习1：使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1

let maybe = Maybe.of([5, 6, 1])
let ex1 = (y) => {
    // 你需要实现的函数。。。
    return maybe.map(fp.map(x => fp.add(x, y)))
}
console.log(ex1(1))


// #### 练习2：实现一个函数 ex2, 能够使用 fp.first 获取列表的第一个元素

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
    // 你需要实现的函数。。。
    return xs.map(fp.first)
}
console.log(ex2())


// #### 练习3：实现一个函数 ex3, 使用 safeProp 和 fp.first 找到 user 的名字的首字母

let safeProp = fp.curry(function(x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
    // 你需要实现的函数。。。
    return safeProp('name',user).map(fp.first)
}
console.log(ex3())


// #### 练习4：使用 Maybe 重写 ex4， 不要有 if 语句

let ex4 = function(n) {
    return Maybe.of(n).map(x => parseInt(x))
}
console.log(ex4(1.02))