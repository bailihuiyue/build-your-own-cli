const fs = require('fs');
const { copyFile, readTepmlate, appendFile } = require('./index');

mergeConfigFile = ({ configTsPath, routeConfigTsTplPath, routeConfigTsPath, configTsTplPath, configTsPluginTplPath }) => {
    let file = fs.readFileSync(configTsPath, 'utf-8').split('\n');
    let hasDelRoute = 0;
    let hasDelTheme = 0;
    let hasDelBlock = 0;
    let hasWriteHead = false;
    let newFileArr = [];
    let passNextLine = false;
    let prefix = "";
    for (let i = 0, len = file.length; i < len; i++) {
        // tip:在最开始的地方引入文件和声明
        let prevLine = file[i === 0 ? 0 : i - 1];
        let currLine = file[i];
        let nextLine = file[i + 1];
        if (currLine.indexOf("import") >= 0 && nextLine.indexOf("import") < 0 && !hasWriteHead) {
            // tip:拷贝routeConfig.ts文件
            copyFile(routeConfigTsTplPath, routeConfigTsPath);
            const replaceContent = `${currLine}
import pageRoutes from './router.config';
const themeColor = '#C8102e';
            `;
            currLine = replaceContent;
            hasWriteHead = true;
        }
        // tip:删除原文件中routes内容
        if (!passNextLine) {
            newFileArr.push(currLine);
        }
        const matchRouteBegin = currLine.match(/^(\s*)routes: \[/);
        if (matchRouteBegin && hasDelRoute === 0) {
            prefix = matchRouteBegin[1];
            hasDelRoute++;
            passNextLine = true;
            newFileArr.pop();
        }
        if (hasDelRoute === 1) {
            var re = new RegExp("^" + prefix + "\\],");
            const matchRouteEnd = currLine.match(re);
            if (matchRouteEnd) {
                passNextLine = false;
                hasDelRoute++;
                prefix = "";
            }
        }
        // tip:删除原文件中theme内容
        const matchThemeBegin = currLine.match(/^(\s*)theme: \{/);
        if (matchThemeBegin && hasDelTheme === 0) {
            prefix = matchThemeBegin[1];
            hasDelTheme++;
            passNextLine = true;
            newFileArr.pop();
        }
        if (hasDelTheme === 1) {
            var re = new RegExp("^" + prefix + "\\},");
            const matchThemeEnd = currLine.match(re);
            if (matchThemeEnd) {
                passNextLine = false;
                hasDelTheme++;
                prefix = "";
            }
        }
        // tip:删除原文件中block内容
        const matchBlockBegin = currLine.match(/^(\s*)block: \{/);
        if (matchBlockBegin && hasDelBlock === 0) {
            prefix = matchBlockBegin[1];
            hasDelBlock++;
            passNextLine = true;
            newFileArr.pop();
        }
        if (hasDelBlock === 1) {
            var re = new RegExp("^" + prefix + "\\},");
            const matchThemeEnd = currLine.match(re);
            if (matchThemeEnd) {
                passNextLine = false;
                hasDelBlock++;
                prefix = "";
            }
        }
        // tip:将模板中的配置文件写入
        if (currLine.indexOf("plugins,") >= 0) {
            let tpl = fs.readFileSync(configTsTplPath, 'utf-8');
            newFileArr.push(tpl);
        }
        // tip:写入NODE_ENV
        if (currLine.indexOf("process.env") >= 0) {
            const newline = currLine.replace("}", ", NODE_ENV }");
            newFileArr.pop();
            newFileArr.push(newline);
        }
        // tip:写入plugins内容
        if (currLine.indexOf("{") >= 0 && prevLine.indexOf('umi-plugin-react') >= 0) {
            let plugins = fs.readFileSync(configTsPluginTplPath, 'utf-8');
            newFileArr.push(plugins);
        }
        fs.writeFileSync(configTsPath, newFileArr.join('\n'));
    }
}

mergeBasicLayoutFile = ({ BasicLayoutPath, FooterTplPath, projectName, icoPath, icoTplPath, globalLessTplPath, globalLessPath }) => {
    copyFile(icoTplPath, icoPath);
    appendFile(globalLessTplPath, globalLessPath);
    let file = fs.readFileSync(BasicLayoutPath, 'utf-8').split('\n');
    let hasWriteHead = false;
    for (let i = 0, len = file.length; i < len; i++) {
        let prevLine = file[i === 0 ? 0 : i - 1];
        let currLine = file[i];
        let nextLine = file[i + 1];

        if (currLine.indexOf("import") >= 0 &&
            nextLine.match(/^\s*$/, '')
            && !hasWriteHead) {
            file[i] += `\r\nimport { Icon } from 'antd';`
            hasWriteHead = true;
        }

        if (currLine.indexOf("return defaultDom") >= 0 &&
            nextLine.indexOf("}") >= 0 &&
            prevLine.indexOf("!isAntDesignPro()") >= 0) {
            readTepmlate({
                tplPath: FooterTplPath,
                options: {
                    year: new Date().getFullYear(),
                    projectName
                },
                cb: (data) => file[i] = data
            });
        }

        if (currLine.indexOf("import logo from") >= 0) {
            file[i] = `\r\nimport logo from '../assets/logo.png';`
        }

    }
    fs.writeFileSync(BasicLayoutPath, file.join('\n'));
}

wirteLoginWords = ({ tplPath, filePath, projectName, lang, index }) => {
    readTepmlate({
        tplPath,
        options: {
            projectName
        },
        cb: (data) => {
            fs.writeFileSync(filePath, data);
            const destPath = index + lang + '.ts';
            let file = fs.readFileSync(destPath, 'utf-8').split('\n');
            hasWriteHead = false;
            hasWriteBody = false;
            for (let i = 0, len = file.length; i < len; i++) {
                let prevLine = file[i === 0 ? 0 : i - 1];
                let currLine = file[i];
                let nextLine = file[i + 1];
                if (currLine.indexOf("import") >= 0 &&
                    nextLine.match(/^\s*$/, '') &&
                    !hasWriteHead) {
                    file[i] += `\r\nimport login  from './${lang}/login';`
                    hasWriteHead = true;
                }
                if (currLine.indexOf("...") >= 0 &&
                    nextLine.indexOf("}") >= 0 &&
                    !hasWriteBody) {
                    file[i] += `\r\n  ...login`;
                    hasWriteBody = true;
                }
            }
            fs.writeFileSync(destPath, file.join('\n'));
        }
    });
}

module.exports = {
    mergeConfigFile,
    wirteLoginWords,
    mergeBasicLayoutFile
};