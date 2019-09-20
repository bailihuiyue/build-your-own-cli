const program = require('commander');
const { version } = require('./utils');
const path = require('path');

const actionsMap = {
  create: { // 创建模板
    description: 'create project',
    alias: 'cr',
    examples: [
      'build-your-own-cli create <project-name>',
    ],
  },
  edit_tpl: {
    description: 'edit template files',
    alias: 'e',
    examples: [
      'build-your-own-cli edit_tpl'
    ],
  },
  '*': {
    description: 'command not found',
  },
};
// 循环创建命令
Object.keys(actionsMap).forEach((action) => {
  program
    .command(action) // 命令的名称
    .alias(actionsMap[action].alias) // 命令的别名
    .description(actionsMap[action].description) // 命令的描述
    .action(() => { // 动作
      if (action === '*') { // 如果动作没匹配到说明输入有误
        console.log('command not found, type -h for help');
      } else { // 引用对应的动作文件 将参数传入
        require(path.resolve(__dirname + "/commands", action))(...process.argv.slice(3));
      }
    })
});

program.on('--help', () => {
  Object.keys(actionsMap).forEach((action) => {
    (actionsMap[action].examples || []).forEach((example) => {
      console.log(`${example}`);
    });
  });
});

program.version(version)
  .parse(process.argv);