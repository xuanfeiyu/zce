## 1. 请简述 React 16 版本中初始渲染的流程

要将 React 元素渲染到页面中，分为两个阶段，render 阶段和 commit 阶段。
render 阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作。
commit 阶段负责根据 Fiber 节点标记 ( effectTag ) 进行相应的 DOM 操作。

## 2. 为什么 React 16 版本中 render 阶段放弃了使用递归

递归无法中断，执行重任务耗时长。 JavaScript 又是单线程，无法同时执行其他任务，导致任务延迟页面卡顿，用户体验差。

## 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

- 第一个子阶段 调用类组件的 getSnapshotBeforeUpdate 生命周期函数
- 第二个子阶段 根据 effectTag 执行 DOM 操作
- 调用类组件的生命周期函数和函数组件的钩子函数


## 4. 请简述 workInProgress Fiber 树存在的意义是什么

实现双缓存技术, 在内存中构建 DOM 结构以及 DOM 更新, 在 commit 阶段实现 DOM 的快速更新.

> 双缓存技术

当我们用canvas绘制动画，每一帧绘制前都会调用ctx.clearRect清除上一帧的画面。如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。这种在内存中构建并直接替换的技术叫做双缓存 。

> 双Fiber树

在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树，它反映了要刷新到屏幕的未来状态。current Fiber树中的Fiber节点被称为current fiber。workInProgress Fiber树中的Fiber节点被称为workInProgress fiber，它们通过alternate属性连接。

React应用的根节点通过current指针在不同Fiber树的rootFiber间切换来实现Fiber树的切换。当workInProgress Fiber树构建完成交给Renderer渲染在页面上后，应用根节点的current指针指向workInProgress Fiber树，此时workInProgress Fiber树就变为current Fiber树。每次状态更新都会产生新的workInProgress Fiber树，通过current与workInProgress的替换，完成DOM更新。由于有两颗fiber树，实现了异步中断时，更新状态的保存，中断回来以后可以拿到之前的状态。并且两者状态可以复用，节约了从头构建的时间。

> 内存构建
workInProgress在内存中构建，构建完成才统一替换，这样不会产生不完全的真实dom。