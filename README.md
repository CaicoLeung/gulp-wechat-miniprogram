# gulp-wechat-miniprogram

基于gulp构建的微信小程序开发流

## 特性

- [x] 支持所有原生语法特性
- [x] 支持小程序npm
- [x] 支持Typescript(引入miniprogram-api-typings小程序声明文件)
- [x] 支持Scss, Sass
- [x] 支持样式补全
- [x] 支持Eslint
- [x] 支持Stylelint
- [x] 命令行一键创建page和component目录(wxml, ts, wxss, json文件)
- [x] watch热更新
- [x] cli脚手架

## 目标

- [ ] 监听文件删除
- [ ] 路径alias别名(@page, @com, @utils, @config...)

## 开始使用

1. 安装本项目的脚手架: [mp-cli](https://github.com/CaicoLeung/miniprogram-cli)

2. 开始, 生成dist目录, 用微信开发者工具打开dist目录

    ```bash
    npm run start
    yarn start
    ```

## 添加小程序npm支持

1. 以dayjs, lodash示例, 执行以下命令(支持多个npm同时安装)

    ```bash
    yarn add_npm dayjs lodash
    ```

2. 重新启动项目

    ```bash
    yarn start
    yarn start
    ```

3. 点击开发者工具 - 工具 - 构建npm完成构建并使用

    - js 中引入 npm 包：

      ```javascript
      const dayjs = require('dayjs')
      const _ = require('lodash')
      ```

    - ts 中引入 npm 包：

      ```typescript
      import dayjs from 'dayjs'
      import _ from 'lodash'
      ```

    - 使用 npm 包中的自定义组件：

      ```json
      {
        "usingComponents": {
          "myPackage": "packageName",
          "package-other": "packageName/other"
        }
      }
      ```

## 说明

- wxs模块
  > 在app/modules目录内的ts文件将编译成.wxs模块, 模块规范使用CommonJS标准(即使用module.exports导出), 在wxml内直接引用模块

  ```html
    <wxs src="./modules/tools.wxs" module="tools" />
  ```

- template模板
  > 虽然不受限, 但建议放置在app/templates目录内
