// ### 一、将下面的异步代码使用 Promise 的方式改进

// setTimeout(function () {
//     var a = 'hello'
//     setTimeout(function () {
//         var b = 'lagou'
//         setTimeout(function () {
//             var c = 'I ❤ U'
//             console.log(a + b + c)
//         }, 10)
//     }, 10)
// }, 10)

// new Promise(resolve => {
// 	setTimeout(() => resolve('hello'), 10);
// }).then(value => {
// 	return new Promise(resolve => {
// 		setTimeout(() => resolve(value + 'lagou'), 10);
// 	});
// }).then(value => {
// 	setTimeout(() => { console.log(value + 'I ❤ U'); }, 10);
// });

Promise.resolve('hello')
.then(res => res + ' lagou')
.then(res => res + ' I ❤ U')
.then(res => console.log(res))
