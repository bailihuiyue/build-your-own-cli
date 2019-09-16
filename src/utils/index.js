// 命令行中显示加载中
const ora = require('ora');
const { name, version } = require('../../package.json');
const downloadPath = process.cwd() + "/test";
const inquirer = require('inquirer');

const waiting = async (fn, message) => {
  const spinner = ora(message);
  spinner.start(); // 开始loading
  const r = await fn().then(res => {
    spinner.succeed();
    return true
  }).catch(err => {
    spinner.fail()
    return err
  });
  // 结束loading
  return r;
};

const prompt = ({ type, message, name }) => inquirer.prompt([{
  type,
  name,
  message
}]).catch(err => err)

module.exports = {
  name,
  version,
  waiting,
  downloadPath,
  prompt
};