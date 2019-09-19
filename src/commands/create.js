// const axios = require('axios');
const path = require('path');
const shelljs = require('shelljs');
// 命令行交互工具
const inquirer = require('inquirer');
const { waiting, downloadPath, prompt, replaceFileContent, replaceJSONContent, copyFile, readTepmlate, appendFile } = require('../utils/index');
const { mergeConfigFile, mergeBasicLayoutFile, wirteLoginWords } = require('../utils/businessUtil');
const { promisify } = require('util');
const fs = require('fs'); //文件模块

let downLoadGit = require('download-git-repo');
downLoadGit = promisify(downLoadGit);

const packageJsonPath = `${downloadPath}/package.json`;
const documentEjsPath = `${downloadPath}/src/pages/document.ejs`;
const defaultSettingsPath = `${downloadPath}/config/defaultSettings.ts`;
const configTsPath = `${downloadPath}/config/config.ts`;
const routeConfigTsPath = `${downloadPath}/config/router.config.ts`;
const configLessPath = `${downloadPath}/src/config.less`;
const globalLessPath = `${downloadPath}/src/global.less`;
const requestPath = `${downloadPath}/src/utils/request.ts`;
const authorityTsPath = `${downloadPath}/src/utils/authority.ts`;
const logoPath = `${downloadPath}/src/assets/login.png`;
const icoPath = `${downloadPath}/src/assets/logo.png`;
const UserLayoutPath = `${downloadPath}/src/layouts/UserLayout.tsx`;
const publicWordPath = `${downloadPath}/src/utils/publicWord.ts`;
const BasicLayoutPath = `${downloadPath}/src/layouts/BasicLayout.tsx`;
const UserLayoutLessPath = `${downloadPath}/src/layouts/UserLayout.less`;
const loginWordsEnPath = `${downloadPath}/src/locales/en-US/login.ts`;
const loginWordsCnPath = `${downloadPath}/src/locales/zh-CN/login.ts`;
const loginWordsIndexPath = `${downloadPath}/src/locales/`;

const documentEjsTplPath = `${__dirname}/../template/document.ejs.tpl`;
const configTsTplPath = `${__dirname}/../template/config.ts.tpl`;
const routeConfigTsTplPath = `${__dirname}/../template/router.config.ts.tpl`;
const configLessTplPath = `${__dirname}/../template/config.less.tpl`;
const globalLessTplPath = `${__dirname}/../template/global.less.tpl`;
const requestTplPath = `${__dirname}/../template/request.ts.tpl`;
const authorityTsTplPath = `${__dirname}/../template/authority.ts.tpl`;
const logoTplPath = `${__dirname}/../template/login.png`;
const icoTplPath = `${__dirname}/../template/logo.png`;
const UserLayoutTplPath = `${__dirname}/../template/UserLayout.tsx.tpl`;
const FooterTplPath = `${__dirname}/../template/Footer.tsx.tpl`;
const publicWordTplPath = `${__dirname}/../template/publicWord.ts.tpl`;
const UserLayoutLessTplPath = `${__dirname}/../template/UserLayout.less.tpl`;
const loginWordsEnTplPath = `${__dirname}/../template/loginWords_en.tpl`;
const loginWordsCnTplPath = `${__dirname}/../template/loginWords_zn.tpl`;

// 1).获取Ant design Pro process.cwd()表示当前执行程序的路径（执行命令行时候的路径,不是代码路径 例如 在根目录下执行 node ./xxx/xxx/a.js 则 cwd 返回的是 根目录地址,或者使用path.join(path.resolve(), projectName)也可以达到同样的效果
const fetchAntdPro = () => {
    return downLoadGit('ant-design/ant-design-pro', downloadPath)
};

module.exports = async (projectName, args) => {

    // tip: 获取用户输入的内容
    const { addLogin } = await prompt({
        type: "confirm",
        message: "add Login blocks?",
        name: "addLogin",
    });
    const { mergeConfig } = await prompt({
        type: "confirm",
        message: "merge config files?",
        name: "mergeConfig",
    });
    const { yarn } = await prompt({
        type: "confirm",
        message: "install packages immediately?",
        name: "yarn",
    });
    const { mergeRequest } = await prompt({
        type: "confirm",
        message: "merge request files?",
        name: "mergeRequest",
    });
    const { author } = await prompt({
        type: "input",
        message: "please enter author",
        name: "author",
    });

    // tip:获取ant design代码
    const fetchCb = await waiting(fetchAntdPro, 'fetching antd pro');
    if (fetchCb) {
        // tip:将修改好的版本号,项目名称写回package.json文件
        replaceJSONContent({ path: packageJsonPath, content: { name: projectName, author } }); //TODO:目前有bug
        // tip:将项目名称写入模板的title
        const documentEjsTpl = fs.readFileSync(documentEjsTplPath, 'utf-8');
        replaceFileContent({
            path: documentEjsPath,
            content: documentEjsTpl + `
    <title>${projectName}</title>`,
            reg: "<title>"
        });
        replaceFileContent({ path: defaultSettingsPath, content: `  title: '${projectName}',`, reg: "title:" });

        // 拷贝颜色(主题)文件到项目
        copyFile(configLessTplPath, configLessPath);
        console.log("config.less copied successful");
        // 拷贝footer内容到BasicLayout
        mergeBasicLayoutFile({ BasicLayoutPath, FooterTplPath, projectName, icoPath, icoTplPath, globalLessTplPath, globalLessPath });

        if (mergeConfig) {
            // tip:替换config文件
            mergeConfigFile({ configTsPath, routeConfigTsTplPath, routeConfigTsPath, configTsTplPath });
            console.log("config.ts replaced successful");
        }
        if (mergeRequest) {
            copyFile(publicWordTplPath, publicWordPath);
            copyFile(requestTplPath, requestPath);
            appendFile(authorityTsTplPath, authorityTsPath);
        }
        if (addLogin) {
            shelljs.cd(downloadPath);
            shelljs.exec('umi block add Login --page');
            copyFile(logoTplPath, logoPath);
            copyFile(UserLayoutTplPath, UserLayoutPath);
            copyFile(UserLayoutLessTplPath, UserLayoutLessPath);
            console.log("Login block added successful");
            wirteLoginWords({ tplPath: loginWordsEnTplPath, filePath: loginWordsEnPath, projectName, lang: 'en-US', index: loginWordsIndexPath });
           wirteLoginWords({ tplPath: loginWordsCnTplPath, filePath: loginWordsCnPath, projectName, lang: 'zh-CN', index: loginWordsIndexPath });
        }

        // TODO:1改造登录界面,2.添加request文件

        // **************************此行内容永远在最后执行************************
        // tip:安装依赖
        if (yarn) {
            await waiting(() => new Promise(
                function (resolve, reject) {
                    shelljs.cd(downloadPath);
                    shelljs.exec('yarn install');
                    resolve(true);
                }
            ), 'installing packages ');
            shelljs.exec('npm start');
        }
    } else {
        console.log("download failed, please try again");
    }
};