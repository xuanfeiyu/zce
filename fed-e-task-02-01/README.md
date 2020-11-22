# Part 2 · 前端工程化实践

## 模块一 · 开发脚手架及封装自动化构建工作流

## 简答题

### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

答： 工程化指的是遵循一定标准和规范，通过工具去提升效率、降低成本的一种手段。工程化**不等于**某个工具。工具不是工程化的核心。工程化的核心是对项目的一种整体规划或者架构，而工具在这个过程中只是帮我们落地去实现这种规划或架构的一种手段。

- 想要使用 ES6+ 新特性，但是兼容有问题
- 想要使用 Less/Sass/PostCSS 增强 CSS 的编程性，但是运行环境不能直接支持
- 想要使用模块化的方式提高项目的可维护性，但运行环境不能直接支持
- 部署上线前需要手动压缩代码及资源文件，部署过程需要手动上传代码到服务器
- 多人协作开发，无法硬性统一大家的代码风格，从仓库中pull回来的代码质量无法保证
- 部分功能开发时需要等待后端服务接口提前完成

- 主要解决的问题
  - 传统语言或语法的弊端
  - 无法使用模块化/组件化
  - 重复的机械式工作
  - 代码风格统一、质量保证
  - 依赖后端服务接口支持
  - 整体依赖后端项目

备注：这里基本上包含了实际项目开发过程中遇到的主要问题，那么工程化所带来的主要价值就是保证开发质量、提升开发效率。

### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

答：除了为我们创建项目结构，更重要的是给开发者提供一些约定和规范。

## 编程题

### 1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具

答：
- 创建项目目录
- 初始化 package.json
- 在 pakage.json 中添加 bin 字段，用于指定 cli 文件的入口文件
- 安装依赖
  - yarn add inquirer
  - yarn add ejs
- 创建 cli.js, 必须有 #!/usr/bin/env node 这样的文件头（如果是Linux 或者 macOS 需要修改此文件的读写权限为 755，通过 chmod 755 cli.js）
- 创建模板文件
- yarn link 关联到全局
- 执行测试
- 代码见 code/sample-scaffolding

### 2、尝试使用 Gulp 完成项目的自动化构建

- 说明：
  - 本次作业中的编程题要求大家完成相应代码后（二选一）
    - 1.简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
    - 2.提交一个项目说明文档，要求思路流程清晰。
  - 最终将录制的视频或说明文档和代码统一提交至作业仓库。

  答：项目说明文档

#### 整体实现思路

- 创建 gulpfile.js 作为 gulp 入口文件
- 安装并引入所需依赖

```javascript
const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const bs = browserSync.create()
const cwd = process.cwd();
```

- 抽象路径配置

```javascript
let config = {
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      style: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
};
```

- 样式编译

```javascript
const style = () => {
  return src(config.build.paths.style, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}
```

- 脚本编译

```javascript
const script = () => {
  return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}
```

- 页面模板编译

```javascript
const page = () => {
  return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.swig({ data: config.data }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}
```

- 图片和字体文件转换

```javascript
// 图片文件转换
const image = () => {
  return src(config.build.paths.images, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist))
}
// 文字文件转换
const font = () => {
  return src(config.build.paths.fonts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist))
}
```

- 其它文件

```javascript
const extra = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.dist))
}
```

- 开发服务器及监视变化

```javascript
const devServe = () => {
  watch(config.build.paths.style, { cwd: config.build.src }, style)
  watch(config.build.paths.scripts, { cwd: config.build.src }, script)
  watch(config.build.paths.pages, { cwd: config.build.src }, page)
  watch([ config.build.paths.images, config.build.paths.fonts], { cwd: config.build.src }, bs.reload)
  watch('**', { cwd: config.build.public }, page)

  bs.init({
    notify: false,
    port: 8080,
    // open: false,
    // files: 'dist/**',
    server: {
      baseDir:[config.build.temp, config.build.src, config.build.public],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}
```

- 文件引用处理

```javascript
const useref = () => {
  return src(config.build.paths.pages, { base: config.build.temp, cwd: config.build.temp })
    .pipe(plugins.useref({
      searchPath: [config.build.temp, '.']
    }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest(config.build.dist))
}
```

- 执行命令

```javascript
const compile = parallel(style, script, page)
const clean = () => {
  return del([config.build.dist, config.build.temp])
}
const build = series( clean, parallel(series(compile, useref), image, font, extra ))
const serve = series(compile, devServe)
const start  = series(compile, distServer)
```

#### 项目使用命令

- 清除编译文件

```javascript
  yarn clean
```
- 项目构建

```javascript
  yarn build
```
- 开发环境

```javascript
  yarn serve
```
- 生产环境

```javascript
  yarn start
```

