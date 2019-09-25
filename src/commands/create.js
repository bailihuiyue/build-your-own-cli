const shelljs = require('shelljs');
const { waiting, downloadPath, prompt, replaceFileContent, replaceJSONContent, copyFile, appendFile, isFloderExist } = require('../utils/index');
const { mergeConfigFile, mergeBasicLayoutFile, wirteLoginWords } = require('../utils/businessUtil');
const { progress } = require('../utils/progress');
const { promisify } = require('util');
const fs = require('fs'); //文件模块

let downLoadGit = require('download-git-repo');
downLoadGit = promisify(downLoadGit);

const node_modules_path = `${downloadPath}/node_modules`;
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
const configTsPluginTplPath = `${__dirname}/../template/config.ts.plugin.tpl`;
const routeConfigTsTplPath = `${__dirname}/../template/router.config.ts.tpl`;
const routerConfigNoLoginTplPath = `${__dirname}/../template/router.config.noLogin.tpl`;
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

    console.log('welcome to use build-your-own-cli to build ant design pro project ^_^'.rainbow);
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
        progress({ txt: "Get ant pro successful", percent: 0.15 });
        // tip:将修改好的版本号,项目名称写回package.json文件
        replaceJSONContent({ path: packageJsonPath, content: { name: projectName, author }, remove: ['husky', 'devDependencies/husky'], add: { scripts: { 'add:login': 'umi block add Login --page', 'add:newblock': 'umi block add newblock --page' } } });
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
            mergeConfigFile({ configTsPath, routeConfigTsTplPath: addLogin ? routeConfigTsTplPath : routerConfigNoLoginTplPath, routeConfigTsPath, configTsTplPath, configTsPluginTplPath });
            progress({ txt: "config.ts replaced successful", percent: 0.25 });
        }
        if (mergeRequest) {
            copyFile(publicWordTplPath, publicWordPath);
            copyFile(requestTplPath, requestPath);
            appendFile(authorityTsTplPath, authorityTsPath);
            progress({ txt: "request replaced successful", percent: 0.5 });
        }

        // **************************此行内容永远在最后执行************************
        // tip:安装依赖
        if (yarn) {
            await waiting(() => new Promise(
                function (resolve, reject) {
                    shelljs.cd(downloadPath);
                    progress({ txt: "Install node_modules, be patient~~", percent: 0.75 });
                    shelljs.exec('yarn install');
                    resolve(true);
                }
            ), 'installing packages ');
        }
        if (addLogin && isFloderExist(node_modules_path)) {
            console.log("Begin to add Login block");
            shelljs.cd(downloadPath);
            shelljs.exec('npm run add:login');
            copyFile(logoTplPath, logoPath);
            copyFile(UserLayoutTplPath, UserLayoutPath);
            copyFile(UserLayoutLessTplPath, UserLayoutLessPath);

            wirteLoginWords({ tplPath: loginWordsEnTplPath, filePath: loginWordsEnPath, projectName, lang: 'en-US', index: loginWordsIndexPath });
            wirteLoginWords({ tplPath: loginWordsCnTplPath, filePath: loginWordsCnPath, projectName, lang: 'zh-CN', index: loginWordsIndexPath });
            progress({ txt: "Login block added successful", percent: 0.75 });
        }
        if (isFloderExist(node_modules_path)) {
            progress({ txt: `${projectName} init successful, enjoy!`.rainbow, percent: 1 });
            shelljs.exec('npm start');
        }
    } else {
        console.log("download failed, please try again");
    }
};