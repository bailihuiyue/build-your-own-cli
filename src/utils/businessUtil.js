const fs = require('fs');
const { copyFile } = require('./index');

mergeConfigFile = ({ configTsPath, routeConfigTsTplPath, routeConfigTsPath, configTsTplPath }) => {
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
        fs.writeFileSync(configTsPath, newFileArr.join('\n'));
    }

    // 暂时没用了
    // console.log(newFileArr.join("\n"));
    // const orgFile = fs.readFileSync(configTsPath, 'utf-8').split('\n');
    // // const b = orgFile.match(/export default(\S+)as Config/g);
    // let tepm = [];
    // for (let a in orgFile) {
    //     //tip:去注释
    //     const b = orgFile[a].replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g, '').replace(/\s*/g, "");
    //     if (b) {
    //         tepm.push(b)
    //     }
    // }
    // const b= orgFile.replace(/(\n+)|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, '');
    // tepm = tepm.join("")
    //获取中间的json内容
    // var a = tepm.match(/exportdefault(.*)asIConfig;/)
    // var b = a[1].replace(/,\/\*(.*)\*\//g, "").replace("plugins,", "plugins:plugins,");
    // Object c = b;
    // console.log(c);
}

module.exports = {
    mergeConfigFile
};