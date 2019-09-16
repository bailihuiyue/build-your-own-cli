// const axios = require('axios');
const path = require('path');
// 命令行交互工具
const inquirer = require('inquirer');
const { waiting, downloadPath, prompt } = require('../utils/index');
const { promisify } = require('util');
let downLoadGit = require('download-git-repo');
const fs = require('fs'); //文件模块
const packageJsonPath = `${downloadPath}/package.json`;
const documentEjsPath = `${downloadPath}/src/pages/document.ejs`;
downLoadGit = promisify(downLoadGit);

// const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;

// let repos = await wrapFetchAddLoding(fetchRepoList, 'fetching repo list')();
// let tags = await wrapFetchAddLoding(fetchTagList, 'fetching tag list')(repo);

// 1).获取Ant design Pro process.cwd()表示当前执行程序的路径（执行命令行时候的路径,不是代码路径 例如 在根目录下执行 node ./xxx/xxx/a.js 则 cwd 返回的是 根目录地址,或者使用path.join(path.resolve(), projectName)也可以达到同样的效果
const fetchAntdPro = ({ addLogin, mergeConfig, mergeRequest }) => {
    return downLoadGit('ant-design/ant-design-pro', downloadPath)
};

module.exports = async (projectname, args) => {
    // tip:获取用户输入的内容
    // const addLogin = await prompt({
    //     type: "confirm",
    //     message: "add Login blocks?",
    //     name: "login",
    // });
    // const mergeConfig = await prompt({
    //     type: "confirm",
    //     message: "merge config files?",
    //     name: "config",
    // });
    // const mergeRequest = await prompt({
    //     type: "confirm",
    //     message: "merge request files?",
    //     name: "request",
    // });
    const projectName = await prompt({
        type: "input",
        message: "please enter project name",
        name: "name",
    });
    // const projectVersion = await prompt({
    //     type: "input",
    //     message: "please enter project version",
    //     name: "version",
    // });

    // tip:获取ant design代码
    // const fetchCb = await waiting(fetchAntdPro.bind(this, { addLogin, mergeConfig, mergeRequest }), 'fetching antd pro');
    // if (fetchCb) {
    //     if (addLogin) {
    //         console.log(addLogin)
    //     }
    //     if (mergeConfig) {
    //         console.log(mergeConfig)
    //     }
    //     if (mergeRequest) {
    //         console.log(mergeRequest)
    //     }
    //     const a = await readFile(packageJsonPath, 'utf-8');
    //     console.log(a)
    // } else {
    //     console.log("download failed,please try again");
    // }
    // tip:将修改好的版本号,项目名称写回package.json文件
    // let packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
    // packageJson = JSON.parse(packageJson);
    // packageJson.name = projectName.name;
    // packageJson.version = projectVersion.version;
    // fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson,null,"\t"));
    // tip:将项目名称写入模板的title
    let template = fs.readFileSync(documentEjsPath, 'utf-8').split('\n');
    template = template.map(item => {
        if (item.indexOf("<title>") >= 0) {
            return `
            <meta name="renderer" content="webkit">
            <meta http-equiv="expires" content="0">
            <meta http-equiv="pragma" content="no-cache">
            <meta http-equiv="cache-control" content="no-cache">
            <meta http-equiv="cache" content="no-cache">
            <title>${projectName.name}</title>
            `;
        }
        return item;
    })
    fs.writeFileSync(documentEjsPath, template.join('\n'));
};