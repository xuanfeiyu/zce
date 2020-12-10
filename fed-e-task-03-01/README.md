# 一、简答题

## 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
答：不是 

- 内部原理：通过 defineReactive 把数据转换成 getter 和 setter

```javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
//    this.dog.name = 'Trump'
   this.$set(this.dog, name, 'Trump')
  }
 }
})
```

## 2、请简述 Diff 算法的执行过程
 
- diff 算法只比较同级节点，从父节点开始一层层的向下比较更新 DOM

- 首先调用 patch 方法比较父节点，传入新老 vnode
  - 判断新老 vnode 是否相同，以下相同指的都是 key 相同 sel 相同
  - 如果相同调用 patchVnode 方法，将 vnode 内部的差异更新到当前 oldVnode 对应的 DOM
  - 如果不同从 vnode 创建新的 DOM，将新的 DOM 插入到 oldVnode 对应的 DOM 之前，移除 oldVnode 对应的 DOM

- patchVnode 的执行过程
  - vnode 的 text 属性有值，且与 oldVnode 的 text 值不同，将 oldVnode 对应的 DOM 的子节点移除，设置 DOM 的文本节点为 text
  - vnode 有子节点而 oldVnode 没有子节点，从 vnode 的子节点创建 DOM 并添加到 oldVnode 对应的 DOM 内
  - vnode 没有子节点而 oldVnode 有子节点，从 oldVnode 对应的 DOM 内移除所有的子节点
  - vnode 和 oldVnode 都有子节点，调用 updateChildren 方法对比子节点的差异并更新 DOM

- updateChildren 的执行过程
  - 在新老节点数组的开始和结尾节点标记索引，在遍历过程中移动索引
  - 在移动过程中跳过值为 null 或 undefined 的节点
  - 比较新老开始节点是否相同，如果是相同节点（指 key 和 sel 相同）
    - 使用 patchVnode 对比新老节点的差异，将差异更新到真实 dom
    - 更新索引，继续下一轮对比
  - 如果开始节点不同，比较新老结束节点是否相同，如果是相同节点
    - 使用 patchVnode 对比新老节点的差异，将差异更新到真实 dom
    - 更新索引，继续下一轮对比
  - 如果开始节点和结束节点都不相同，比较老开始节点和新结束节点是否相同，如果是相同节点
    - 使用 patchVnode 对比新老节点的差异，将差异更新到真实 dom
    - 将 oldStartVnode 对应的dom 元素，移动到 oldEndVnode 对应的dom 元素后面
    - 更新索引，继续下一轮对比
  - 如果开始节点和结束节点不相同, 老开始节点和新结束节点也不相同，比较老结束节点和新开始节点是否相同，如果是相同节点
    - 使用 patchVnode 对比新老节点的差异，将差异更新到真实 dom
    - 将 oldEndVnode 对应的dom 元素，移动到 oldStartVnode 对应的dom 元素前面
    - 更新索引，继续下一轮对比
  - 如果以上对比都不相同
    - 判断在老节点数组中是否有和新开始节点 key 值相同的节点
    - 如果没有说明新开始节点是新节点，从 newStartVnode 创建dom 元素，并插入到 oldStartVnode 对应的dom 元素前面
    - 如果有 key 值相同的节点，判断 sel 是否相同
    - 如果不相同，说明节点被修改，从 newStartVnode 创建新的 dom 元素，插入到 oldStartVnode 对应的dom 元素前面
    - 如果相同，使用 patchVnode 对比新老节点的差异，将差异更新到真实 dom，将数组内的这个老节点设为 undefined，便于在之后的对比中跳过
    - 更新索引，继续下一轮对比
  - 循环结束后判断新老节点数组是否未遍历完
   - 如果新节点有剩余，将剩余的新节点根据索引添加到 dom 中
   - 如果老节点有剩余，根据索引移除剩余的老节点

# 二、编程题

## 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
 

## 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
 

## 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：
