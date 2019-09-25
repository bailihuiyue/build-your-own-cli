# build-your-own-cli
###  创建自己的脚手架工具

##### 由于工作要求,频繁的创建基于ant-design-pro的项目,每次下载后都要修改很多文件,于是封装了一个自己的脚手架工具,起名为build-your-own-cli

##### 使用方法:1.clone代码到本地, 2.npm install, 3.npm link(否则无法敲命令)

##### 使用说明:

Usage: index [options] [command]

Options:

  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  create|cr      create project
  edit_tpl|e     edit template files

  *              command not found
build-your-own-cli create <project-name>
build-your-own-cli edit_tpl

##### 注意:

如果初始化时选择安装区块,那么必须安装好依赖文件,否者区块安装报错,因为区块的安装依赖于node_modules

##### 主要用到的参考文献:

inquirer.js —— 一个用户与命令行交互的工具:https://blog.csdn.net/qq_26733915/article/details/80461257  
nodejs取得当前执行路径:https://blog.csdn.net/ISaiSai/article/details/53442748  
手撸一个自己的前端脚手架:https://blog.csdn.net/webyouxuan/article/details/100190061  
【手把手带你撸一个脚手架】第一步, 创建第一个命令:https://www.jianshu.com/p/17384daf707e  
参考代码:https://github.com/luoquanquan/learn-cli  
Nodejs读取本地json文件，输出json数据接口:https://blog.csdn.net/lihefei_coder/article/details/81453716  

##### 主要依赖项:

​    "**commander**": 整体框架  
​    "**colors**": 可以在命令行中输出彩色字符  
​    "**download-git-repo**": 可以在node中clone git代码
​    "**ejs**": 可以自定义模板  
​    "**inquirer**": 命令行中可以使用选择或者输入等功能  
​    "**ora**": 命令行中显示加载中(转圈圈)  
​    "**shelljs**": 在node代码中执行cmd命令  

##### 自己制做了一个进度条,用以显示完成进度,在utils/progress.js中

##### 使用  'npm run add:newblock' 可以初始化一个新的区块! 

等有空会上传到npm中....

欢迎拍砖和讨论