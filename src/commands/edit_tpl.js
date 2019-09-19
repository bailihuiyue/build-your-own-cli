const path = require('path');
const shelljs = require('shelljs');



module.exports = async (projectName, args) => {
    const templatePath = `${__dirname}/../template`;
    shelljs.cd(templatePath);
    shelljs.exec('start .');
};