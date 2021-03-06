
# Part 2 · 前端工程化实践

## 模块一 · 开发脚手架及封装自动化构建工作流

## 一、简答题

### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

答：

- 初始化参数
  - 根据用户在命令窗口输入的参数以及 webpack.config.js 文件的配置，得到最后的配置。

- 开始编译
  - 根据上一步得到的最终配置初始化得到一个 compiler 对象，注册所有的插件 plugins，插件开始监听 webpack 构建过程的生命周期的环节（事件），不同的环节会有相应的处理，然后开始执行编译。

- 确定入口
  - 根据 webpack.config.js 文件中的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去。

- 编译模块
  - 递归过程中，根据文件类型和 loader 配置，调用相应的 loader 对不同的文件做不同的转换处理，再找出该模块依赖的模块，然后递归本步骤，直到项目中依赖的所有模块都经过了本步骤的编译处理。
  - 编译过程中，有一系列的插件在不同的环节做相应的事情，比如 UglifyPlugin 会在 loader 转换递归完对结果使用 UglifyJs 压缩覆盖之前的结果；再比如 clean-webpack-plugin ，会在结果输出之前清除 dist 目录等等。

- 完成编译并输出
  - 递归结束后，得到每个文件结果，包含转换后的模块以及他们之间的依赖关系，根据 entry 以及 output 等配置生成代码块 chunk。

- 打包完成
  - 根据 output 输出所有的 chunk 到相应的文件目录。

### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

答：
- Loader 和 Plugin 的不同点：
  - Loader 专注实现资源模块的转换和加载（编译转换代码、文件操作、代码检查）
  - Plugin 解决其他自动化工作（打包之前清除 dist 目录、拷贝静态文件、压缩代码等等）
  - 作用不同，loader 是为了让 webpack 拥有加载解析非 JavaScript 资源的能力。plugin 则是为了扩展 webpack 的功能。
  - 生命周期，loader 只能在编译转义资源时起作用，plugin 则是在 webpack 任何生命周期都可以使用。

- 开发 Loader 的思路：
  - 可以直接在项目根目录新建 test-loader.js （完成后也可以发布到 npm 作为独立模块使用）
  - 这个文件需要导出一个函数，这个函数就是我们的 loader 对所加载到的资源的处理过程
  - 函数输入为加载到的资源，输出为加工后的结果
  - 输出结果可以有两种形式：第一，输出标准的 JS 代码，让打包结果的代码能正常执行；第二，输出处理结果，交给下一个 loader 进一步处理成 JS 代码
  - 在 webpack.config.js 中使用 loader，配置 module.rules ，其中 use 除了可以使用模块名称，也可以使用模块路径

- 开发 Plugin 的思路：
  - plugin 是通过钩子机制实现的，我们可以在不同的事件节点上挂载不同的任务，就可以扩展一个插件
  - 插件必须是一个函数或者是一个包含 apply 方法的对象
  - 一般可以把插件定义为一个类型，在类型中定义一个 apply 方法
  - apply 方法接收一个 compiler 参数，包含了这次构建的所有配置信息，通过这个对象注册钩子函数
  - 通过 compiler.hooks.emit.tap 注册钩子函数（emit也可以为其他事件），钩子函数第一个参数为插件名称，第二个参数 compilation 为此次打包的上下文，根据 compilation.assets 就可以拿到此次打包的资源，做一些相应的逻辑处理

## 二、编程题

### 1、使用 Webpack 实现 Vue 项目打包任务

- 具体任务及说明：
  - 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
  - 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
  - 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
  - 尽可能的使用上所有你了解到的功能和特性


> 项目说明

- 安装 Webpack
  - webpack
  - webpack-cli

- 安装 babel
  - @babel/core
  - @babel/preset-env
  - babel-loader

- 安装 Loader
  - url-loader
  - file-loader
  - less-loader
  - css-loader
  - style-loader
  - vue-loader

- 安装 Webpack 插件
  - clean-webpack-plugin
  - html-webpack-plugin
  - copy-webpack-plugin

- 不同环境下的配置
  - webpack.common.js
  - webpack.dev.js
  - webpack.prod.js
  




