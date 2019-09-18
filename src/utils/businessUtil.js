const fs = require('fs');
const { copyFile } = require('./index');

mergeConfigFile = ({ configTsPath, routeConfigTsTplPath, routeConfigTsPath, configTsTplPath }) => {
    let file = fs.readFileSync(configTsPath, 'utf-8').split('\n');
    for (let i = 0, len = file.length; i < len; i++) {
        if (file[i].indexOf("import") >= 0 && file[i + 1].indexOf("import") < 0) {
            copyFile(routeConfigTsTplPath, routeConfigTsPath);
            const replaceContent = `${file[i]}
            import pageRoutes from './router.config';

            const primaryColor = '#C8102e';
            `;
            file[i] = replaceContent;
        }
        if (file[i].indexOf("plugins,") >= 0) {
            let tpl = fs.readFileSync(configTsTplPath, 'utf-8');
            const replaceContent = `${file[i]}
            ${tpl}`;
            file[i] = replaceContent;
        }
        fs.writeFileSync(configTsPath, file.join('\n'));
    }
}

module.exports = {
    mergeConfigFile
};