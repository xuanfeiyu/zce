// ### 四、手写实现 MyPromise 源码
// 要求：尽可能还原 Promise 中的每一个API，并通过注释的方式描述思路和原理

/* *
 * 1.Promise 就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 * 2.Promise 中有三种状态，分别为：成功 => fulfilled 失败 => rejected 等待 => pending
 *   pending -> fulfilled
 *   pending -> rejected
 *   一旦状态确定就不可更改
 * 3.resolve和reject函数是用来更改状态的
 *   resolve: fulfilled
 *   reject: rejected
 * 4.then 方法内部做的事情就是判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败的回调函数 then 方法是被定义在原型对象中的
 * 5.then 成功回调有一个参数 表示成功之后的值 then 失败回调有一个参数 表示失败后的原因
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    status = PENDING;
    // 成功之后的值
    value = undefined;
    // 失败之后的原因
    reason = undefined;
    // 成功回调
    successCallback = [];
    // 失败回调
    failCallback = [];

    resolve = value => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态改为成功
        this.status = FULFILLED;
        // 保存成功之后的值
        this.value = value;
        // 判断成功回调是否存在 如果存在 调用
        // this.successCallback && this.successCallback(this.value);
        while (this.successCallback.length) this.successCallback.shift()()

    };

    reject = reason => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态改为失败
        this.status = REJECTED;
        // 保存失败后的原因
        this.reason = reason;
        // 判断失败回调是否存在 如果存在 调用
        // this.failCallback && this.failCallback(this.reason);
        while (this.failCallback.length) this.failCallback.shift()()
    };

    then(successCallback, failCallback) {
        // then 不传递参数处理
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => {
            throw reason
        };

        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                });
                this.failCallback = push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                });
            }
        });

        return promise2;
    };

    finally(callback) {
        return this.then(value => {
            //    异步处理
            return MyPromise.resolve(callback()).then(() => value);
            // callback();
            // return value;
        }, reason => {
            //    异步处理
            return MyPromise.resolve(callback()).then(() => {
                throw reason
            });
            // callback();
            // throw reason;
        })
    };

    catch (failCallback) {
        return this.then(undefined, failCallback);
    };

    static all(array) {
        let result = [];
        let index = 0;

        return new MyPromise((resolve, reject) => {
            // 异步处理
            function addData(key, value) {
                result[key] = value;
                index++;
                if (index === array.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    // 普通值
                    addData(i, array[i]);
                }
            }

        })
    };

    static resolve(value) {
        if (value instanceof MyPromise) return;
        return new MyPromise(resolve => resolve(value));
    };

}

// 判断 x 的值是普通值还是 promise 对象
// 如果是普通值 直接调用resolve
// 如果是 promise 对象 查看 promise 对象返回的结果
// 再根据 promise 对象返回的结果 决定调用 resolve 还是调用 reject
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
        // promise 对象
        // x.then(value => resolve(value),reason => reject(reson))
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}