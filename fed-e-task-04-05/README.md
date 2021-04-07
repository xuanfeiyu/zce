### 1.通过该项目，请简要说明 typescript 比 javascript 的优势在哪？

- ts 是强类型语言、限制了函数的实际参数类型必须与形参完全相同，有更强的约束性，不允许有隐式转换的存在
- ts 可以在编码的阶段发现错误，提高编码的准确性
- ts 接口的定义，有利于后期项目的维护，提高代码的可阅读性，减少不必要的类型判断

### 2.请简述一下支付流程

- 客户端向服务器请求订单数据，服务器生成一个带签名的订单发送给客户端。
- 客户端接收到订单后，向第三方支付服务发起一个支付请求。
- 客户端交易结束后，第三方支付返回支付结果，并向服务器发送一个支付通知，服务器验证支付结果，并返回支付结果。

### 3.react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？

- 主要作用：集中状态管理工具

- Action: 是把数据从应用传到 store 的有效载荷，它是 store 数据的唯一来源。
- Reducers: 指定了应用状态的变化如何响应。
- store: 本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从store访问特定对象的状态。
- Provider: 其实就只是一个外层容器，它的作用就是通过配合 connect 来达到跨层级传递数据。
- connect: 的作用是连接React组件与 Redux store，它包在我们的容器组件的外一层。

### 4.redux 中的异步如何处理？

可以通过引入 redux-thunk、redux-sage 等第三方依赖处理

redux-sage 通过 takeEvery 将 Action 与 响应的处理的 generator 方法进行绑定，
再通过 put 实现 takeEvery 中绑定的方法对其他 Action 的调用
最后通过 all 将所有的 saga 合并暴露 rootSaga，在 createStore 后，通过 sagaMiddleware.run(rootSage) 完成对应的异步处理