## Part3 模块二 Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

## 一、简答题

### 1、请简述 Vue 首次渲染的过程。

- 首先进行 Vue 的初始化，初始化 Vue 的实例成员以及静态成员。

- 初始化结束后，调用 Vue 的构造函数，在 Vue 的构造函数中调用了 this._init(),在这个方法中又调用了vm.$mount()
  - 第一个 $mount 是 src/platform/web/entry-runtime-with-compiler.js 中的
    - 核心作用是把模板编译成 render() 函数。首先会判断是否传入了 render 选项，如果没传入会获取 template 选项，如果没有 template，会把 el 作为模板，然后把模板编译成 render() 函数。通过 compileToFunctions() 生成 renser() 渲染函数。最后将这个render() 存在 options.render 中。
  - 第二个 $mount 是 src/platform/web/runtime/index.js 中的
    - 重新获取 el

- 调用 src/core/instance/lifecycle.js 的 mountComponent(this.el) 
  - 首先判断是否有 render 选项，如果没有但是传入了模板，并且是开发环境的话会发送警告。运行时版本不支持编译器。

- 触发 beforeMount

- 定义 updateComponent
  - 在这个方法中，定义了 _render 和 _update
    - _render 的作用是生成虚拟 DOM
    - _update 的作用是将虚拟 DOM 转换成真实 DOM，并且挂载到页面上

- 创建 Watcher 实例
  - 在创建 Watcher 时，传递了 updateComponent 这个函数，这个函数最终实在Watcher内部调用的
  - 调用 get() 方法，在 get() 方法中会调用 updateComponent()

- 最后触发了生命周期的钩子函数 mounted，挂载结束，return vm

### 2、请简述 Vue 响应式原理。

- observe(): 这个方法接收一个参数 value，就是需要处理成响应式的对象，判断 value 是否为对象，如果不是直接返回，判断 value 是否有 _ob_ 属性，如果有直接返回；如果都没有，创建 observer 对象并且返回

- Observer: 给对象定义不可枚举的 _ob_ 属性，记录当前的 observer 对象；数组的响应式处理，覆盖原生的 push 等方法，它们会改变原数组，当这些方法被调用时发送通知；对象的响应式处理，调用 walk 方法，遍历对象的每个属性，调用 defineReactive

- defineReactive：为每一个属性创建 dep 对象，如果当前属性的值是对象，调用 observe,定义 getter,收集依赖，返回属性的值；定义 setter,保存新值，如果新值是对象，调用 observe,发送通知，调用 dep.notify()

- 收集依赖：在 Watcher 对象的 get 方法中调用 pushTarget 记录 Dep.target 属性，访问 data 中的成员时，defineReactive 的 getter 中收集依赖；把属性对应的 watcher 对象添加到 dep 的 subs 数组中；给 childOb 收集依赖，目的是子对象添加和删除成员时也发送通知

- Watcher： dep.notify 在调用 watcher 对象的 update 方法时，调用 queueWatcher(),判断 watcher 是否被处理，如果没有的话添加到 quene 队列中，并调用 flushSchedulerQuene();触发beforeUpdate钩子函数，调用 watcher.run(), run() -> get() -> getter() -> updateComponent,清空上一次的依赖，触发 actived 钩子，触发 updated 钩子

### 3、请简述虚拟 DOM 中 Key 的作用和好处。

- 作用：在虚拟DOM的diff算法中，在新旧节点的对比时辨别vnode，使用key时，Vue会基于key的变化重新排列元素顺序，尽可能的复用页面元素，只找出必须更新的DOM，最终可以减少DOM的操作。

- 好处：数据更新时，可以减少DOM操作； 列表渲染时，可以提高列表渲染的效率，提高页面的性能

### 4、请简述 Vue 中模板编译的过程。

- compileToFunction():编译模板的入口函数，先从缓存中加载编译好的render函数，如果缓存中没有，则调用compile()开始编译

- compile():先合并选项options,再调用baseComponent()

- baseCompile():先调用parse()把template转换成AST tree,然后调用optimize()优化AST,先标记AST tree中的静态子树，检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点，patch阶段跳过静态子树，调用generate()将AST生成js代码

- compileToFinction(): 将在上一步中生成的字符串形式的js代码转换成函数，调用createFunction()通过new Function()将字符串转换成函数，render和staticRenderFns初始化完毕，挂载到Vue实例对应的options对应的属性中