// const axios = require('axios');
const path = require('path');
const shelljs = require('shelljs');
// 命令行交互工具
const inquirer = require('inquirer');
const { waiting, downloadPath, prompt, replaceFileContent, replaceJSONContent, copyFile } = require('../utils/index');
const { mergeConfigFile } = require('../utils/businessUtil');
const { promisify } = require('util');
const fs = require('fs'); //文件模块

let downLoadGit = require('download-git-repo');
downLoadGit = promisify(downLoadGit);

const packageJsonPath = `${downloadPath}/package.json`;
const documentEjsPath = `${downloadPath}/src/pages/document.ejs`;
const defaultSettingsPath = `${downloadPath}/config/defaultSettings.ts`;
const configTsPath = `${downloadPath}/config/config.ts`;
const routeConfigTsPath = `${downloadPath}/config/router.config.ts`;

const documentEjsTplPath = `${__dirname}/../template/document.ejs.tpl`;
const configTsTplPath = `${__dirname}/../template/config.ts.tpl`;
const routeConfigTsTplPath = `${__dirname}/../template/router.config.ts.tpl`;

// 1).获取Ant design Pro process.cwd()表示当前执行程序的路径（执行命令行时候的路径,不是代码路径 例如 在根目录下执行 node ./xxx/xxx/a.js 则 cwd 返回的是 根目录地址,或者使用path.join(path.resolve(), projectName)也可以达到同样的效果
const fetchAntdPro = () => {
    return downLoadGit('ant-design/ant-design-pro', downloadPath)
};

module.exports = async (projectName, args) => {
    // tip:获取用户输入的内容
    // const { addLogin } = await prompt({
    //     type: "confirm",
    //     message: "add Login blocks?",
    //     name: "addLogin",
    // });
    // const { mergeConfig } = await prompt({
    //     type: "confirm",
    //     message: "merge config files?",
    //     name: "mergeConfig",
    // });
    // const { yarn } = await prompt({
    //     type: "confirm",
    //     message: "install packages immediately?",
    //     name: "yarn",
    // });
    // const { mergeRequest } = await prompt({
    //     type: "confirm",
    //     message: "merge request files?",
    //     name: "mergeRequest",
    // });
    // const { projectVersion } = await prompt({
    //     type: "input",
    //     message: "please enter project version",
    //     name: "projectVersion",
    // });

    // tip:获取ant design代码
    // const fetchCb = await waiting(fetchAntdPro, 'fetching antd pro');
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
    // } else {
    //     console.log("download failed,please try again");
    // }
    // tip:将修改好的版本号,项目名称写回package.json文件
    // replaceJSONContent({ path: packageJsonPath, content: { name: projectName, version: projectVersion } });
    // tip:将项目名称写入模板的title
    // const documentEjsTpl = fs.readFileSync(documentEjsTplPath, 'utf-8');
    // replaceFileContent({
    //     path: documentEjsPath,
    //     content: documentEjsTpl + `
    // <title>${projectName}</title>`,
    //     reg: "<title>"
    // });
    // replaceFileContent({ path: defaultSettingsPath, content: `  title: '${projectName}',`, reg: "title:" });

    //业务相关的内容替换
    // 替换config文件
    mergeConfigFile({ configTsPath, routeConfigTsTplPath, routeConfigTsPath, configTsTplPath });

    // **************************此行内容永远在最后执行************************
    // tip:安装依赖
    // if (yarn) {
    //     await waiting(() => new Promise(
    //         function (resolve, reject) {
    //             shelljs.cd(downloadPath);
    //             shelljs.exec('yarn install');
    //             resolve(true);
    //         }
    //     ), 'installing packages ');
    //     shelljs.exec('npm start');
    // }
};