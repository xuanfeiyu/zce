## 1.说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别。

- application/json的数据格式：json字符串 ，application/x-www-form-urlencoded的数据格式：键值对：key-value 
- application/json数据放在body中，application/x-www-form-urlencoded都可以

> 表单提交时，请求头设置为application/x-www-form-urlencoded，POST和GET的区别

- GET:浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2…），然后把这个字串append到url后面，用?分割，加载这个新的url
- POST:浏览器把form数据封装到http body中，然后发送到server

> springmvc对application/x-www-form-urlencoded和application/json的处理

- application/x-www-form-urlencoded：get 方式中queryString的值，和post方式中 body data的值都会被Servlet接受到并转化到Request.getParameter()参数集中，所以@RequestParam可以获取的到。
- application/json：必须用接受@RequestBody，因为GET请求没有body，所以无法接受，只能使用post


## 2.说一说在前端这块，角色管理你是如何设计的。

- 登录获取用户角色，通过角色配置路由、菜单以及接口权限
- 一般是配合服务端为不同的用户分配不同的角色，不同的角色分配各自的权限

## 3.@vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

- vue-cli 3 是基于 webpack 4 打造，启动打包速度更快，vue-cli 2 还是 webapck 3。
- 项目结构更简单，文件变少，结构更清晰。
- 移除了配置文件目录 config 和 build 文件夹，如果需要自定义配置，需要自己新建vue.config.js文件
- 移除了 static 静态资源文件夹，新增 public 文件夹，静态资源转移到public目录中，通过/xx.xx可以直接访问，并且 index.html 移动到 public 中
- 新增 .browserslistrc 文件，指定了项目的目标浏览器的范围，用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀，可以理解为浏览器兼容。
- 新增 babel.config.js 替代原先的.babelrc，具备和原先.babelrc一样的作用
- 使用 vue create 时，选项简化，启动项目 由npm run dev 改成 npm run serve
- @vue/cli 遵循工具(tooling)最佳实践，并将这些最佳做法作为 Vue apps 的默认配置 Preset Webpack 配置
- ES2017 和 Babel 7 开箱即用的支持
- 出色的 CSS 支持，包括 SCSS 和 PostCSS 支持
- 许多集成选项（TypeScript，PWA，Web components，点对点测试，Jest等）
- 提供了 vue ui 命令，通过可视化界面来使用 GUI 安装和管理插件（当然也可以通过vue add plugin添加插件），例如使用 iView 按需引入的时候，可以直接在可视化界面中安装 vue-cli-plugin-iview，则可以实现按需引入
- 在 2.x 版本里，不管数据多大，都会在一开始就为其创建观察者。当数据很大时，这可能会在页面载入时造成明显的性能压力。3.x 版本，只会对「被用于渲染初始可见部分的数据」创建观察者，而且 3.x 的观察者更高效
- 3.0 新加入了 TypeScript 以及 PWA 的支持

## 4.详细讲一讲生产环境下前端项目的自动化部署的流程。

- 本地代码提交仓库 打tag
- 构建工具（如jenkins）构建

- 如不通过构建工具  打包-本地测试预览-线上部署

## 5.你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。

- 跨域 通过配置代理
- vueX 刷新数据丢失  缓存存储

## 6.针对新技术，你是如何过渡到项目中？

- 可以先从影响不大的位置着手，通过持续迭代，达到重构的目的。