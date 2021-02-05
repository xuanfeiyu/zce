## 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

- 响应式系统升级
- 编译优化
- 源码体积的优化

> 响应式系统升级

- Vue.js 2.x 中响应式系统的核心 defineProperty
- Vue.js 3.0 中使用 Proxy 对象重写响应式系统
  - 可以监听动态新增的属性
  - 可以监听删除的属性
  - 可以监听数组的索引和 length 属性

> 编译优化

- Vue.js 2.x 中通过标记静态根节点，优化 diff 的过程
- Vue.js 3.x 中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容
  - Fragments（升级 Vetur 插件）
  - 静态提升
  - Patch flag
  -缓存事件处理函数

> 源码打包体积

- Vue.js 3.0 中移除了一些不常用的 API
  - 例如：inline-template、filter 等
- Tree-shaking

## 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

- Options API
  - 包含一个描述组件选项（data、metheds、props等）的对象
  - Options API 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项

- Composition API
  - Vue.js 3.0新增的一组 API
  - 一组基于函数的 API
  - 可以更灵活的组织组件的逻辑

## 3、Proxy 相对于 Object.defineProperty 有哪些优点？

> Proxy的优势如下

- Proxy可以直接监听整个对象而非属性。
- Proxy可以直接监听数组的变化。
- Proxy有13中拦截方法，如ownKeys、deleteProperty、has 等是 Object.defineProperty 不具备的。
- Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而 Object.defineProperty 只能遍历对象属性直接修改;
- Proxy做为新标准将受到浏览器产商重点持续的性能优化,也就是传说中的新标准的性能红利。

> Object.defineProperty 的优势如下

- 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平。

> Object.defineProperty 不足在于：

- Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。
- Object.defineProperty 不能监听数组。是通过重写数据的那7个可以改变数据的方法来对数组进行监听的。
- Object.defineProperty 也不能对 es6 新产生的 Map,Set 这些数据结构做出监听。
- Object.defineProperty 也不能监听新增和删除操作，通过 Vue.set() 和 Vue.delete来实现响应式的。


## 4、Vue 3.0 在编译方面有哪些优化？

- Vue.js 2.x 中通过标记静态根节点，优化 diff 的过程
- Vue.js 3.x 中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容
  - Fragments（升级 Vetur 插件）
  - 静态提升
  - Patch flag
  - 缓存事件处理函数

## 5、Vue.js 3.0 响应式系统的实现原理？

- Proxy 对象实现属性监听
- 多层属性嵌套，在访问属性过程中处理下一级属性
- 默认监听动态加的属性
- 默认监听属性的删除操作
- 默认监听数组索引和 length 属性
- 可以作为单独的模块使用

> 核心方法

- reactive/ref/toRefs/computed
- effect
- track
- trigger