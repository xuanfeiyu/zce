
* 打包工具为了方便使用 parcel

* 创建项目，并安装 parcel

# 创建项目目录

md sanbbdom-demo

# 进入项目目录

cd snabbdom-demo

# 创建 package.json

yarn init -y

# 本地安装 parcel

yarn add pacel-bundler

* 配置 package.json 的 scripts

  "scripts": {
    "dev": "parcel index.html --open",
    "build": "parcel build index.html"
  },

* 创建目录结构

| index.html
| package.json
|_src
        01-basicusage.js

# 安装 snabbdom

yarn add snabbdom@0.7.4