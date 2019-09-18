// 命令行中显示加载中
const ora = require('ora');
const { name, version } = require('../../package.json');
const downloadPath = process.cwd() + "/test";
const inquirer = require('inquirer');
const fs = require('fs'); //文件模块

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

const replaceFileContent = ({ path, content, reg }) => {
  let tpl = fs.readFileSync(path, 'utf-8').split('\n');
  tpl = tpl.map(item => {
    if (item.indexOf(reg) >= 0) {
      return content;
    }
    return item;
  })
  fs.writeFileSync(path, tpl.join('\n'));
}

const replaceJSONContent = ({ path, content }) => {
  let json = fs.readFileSync(path, 'utf-8');
  json = JSON.parse(json);
  for (let k in content) {
    json[k] = content[k];
  }
  fs.writeFileSync(path, JSON.stringify(json, null, "\t"));
}

const copyFile = (from, to) => {
  fs.writeFileSync(to, fs.readFileSync(from));
  //fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
}
module.exports = {
  name,
  version,
  waiting,
  downloadPath,
  prompt,
  replaceFileContent,
  replaceJSONContent,
  copyFile
};