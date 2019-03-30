# mall
`二手交易平台` `前后端分离` `React` `typescript` `nodejs` `express`

## 主要功能
```
具体业务功能如下

1. 功能如下
   1. 买家和卖家注册和登录功能(卖家注册需要从管理员这里获取注册码才可以注册)
   2. 卖家发布、修改、查看、删除商品功能、上传图片功能 (集成富文本编辑器tinymce)
   3. 买家查看商品，添加购物车，添加、减少商品数量功能 (支付功能未提供)
2. 管理员 http://localhost:9003
   1. 登录 (账号root 密码1)， 可以查看系统所有用户，以及为卖家产生注册码
```

## cai-mall
> 这是用React写的一个前端应用
>
> 涉及的主要技术有
1. React jsx和面向对象
2. React-Router 前端路由
3. Redux 状态管理
4. antd ui组件
5. scss 可以继承和使用变量的css高级语法
6. typescript 带类型的js或者es6的超集

```
运行
cd cai-mall
yarn install
本地调试
yarn run start

部署
yarn run build 
然后将dist部署到服务器。即可
const BASE_URL = env === 'development' ? "http://localhost:9003" : "http://yourserver:9003";
```


## cai-mall-server
> 这是基于express框架的后端server
> 
> 涉及的主要技术有
1. nodejs 事件驱动，非阻塞io，基于chrome v8的js运行环境
2. express 基于nodejs的后端框架，中间件
3. typescript 带类型的js语法，使得项目好维护，开发高效
4. mysql 数据库
5. ejs express中的模板引擎

```
数据库的配置在 .env配置文件中。
具体可以参考npm库-dotenv

需要先将cai-mall.sql 备份到你的数据库中
具体命令 mysqldump

cd cai-mall-server
yarn install
yarn run dev:start 
即可
SERVER_PORT=9003
```
