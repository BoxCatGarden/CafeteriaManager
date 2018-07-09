# 职工食堂自助餐管理系统
职工食堂自助餐管理系统是一个课程设计。。用来管理“某公司”的职工在食堂吃福利餐的日常。

## 开发环境
Node.js 10.3.0，MySQL 5.7, WebStorm，Windows 10，8 GB RAM，Intel Core i7-6700HQ 2.60 GHz。

## 运行环境
Node.js 10.3.0，MySQL 5.7

## 系统安装方法
### 1 将文件下载到本地
### 2 安装依赖包
1. 使用命令行工具执行npm install。
2. 等待依赖包安装到当前文件夹下。
3. 安装完成。
### 3 配置数据库
1. 创建数据库，名为cafeteria。如果你要使用其他名字，请同时修改config.json中的database.pool.database字段为你要使用的数据库的名字。
2. 运行external/initDB.sql初始化数据库。
3. 修改config.josn中的database.pool，配置你的数据库信息。
4. 配置完成。
### 4 安装完成

## 使用方法
1. 使用命令行工具执行node index.js，运行服务器脚本。
2. 保持命令行工具的打开。
3. 访问站点localhost:3274使用系统。站点端口可以在config.json中配置port字段来修改。
4. 输入账号和密码登陆。已经配置的账号（身份）：everlu（超级用户），flas（食堂经理），chaos（部门负责人）；默认密码都是123456。
5. 访问localhost:3274/post_eat.html，模拟职工刷卡就餐。就餐时段可以在config.json的eat.duration字段设置，粒度为小时；每天0点开始，23:59结束，要设置全天就餐，可以插入\[0,24\]。
6. 访问localhost:3274/exit，优雅地停止服务器的运行。
