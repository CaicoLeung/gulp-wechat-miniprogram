# gulp-wechat-miniprogram
基于gulp构建的微信小程序开发模板

## 特性
1. 支持Typescript
2. 支持Scss, Sass
3. 支持Eslint
4. 支持图片压缩

## 开始使用
1. 确保已全局安装gulp
  ```
  $ npm install -g gulp gulp-cli
  ```
2. git clone 代码
  ```
  $ git clone git@github.com:CaicoLeung/gulp-wechat-miniprogram.git
  ```
3. 进度目录, 并安装依赖

  ```
  $ cd gulp-wechat-miniprogram && npm install
  ```
4. 创建page
  ```
  $ gulp create --page [name]
  ```
5. 编译代码, 生成dist目录, 用微信开发者工具打开dist目录
  ```
  $ npm run build
  $ npm run watch
  ```