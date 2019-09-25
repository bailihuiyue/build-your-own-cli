// 命令行中显示加载中
const ora = require('ora');
const { name, version } = require('../../package.json');
const downloadPath = process.cwd();
const inquirer = require('inquirer');
const fs = require('fs'); //文件模块
const ejs = require('ejs');

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

const replaceJSONContent = ({ path, content, remove, add }) => {
  let json = fs.readFileSync(path, 'utf-8');
  json = JSON.parse(json);
  for (let k in content) {
    json[k] = content[k];
  }
  remove.forEach((item) => {
    if (item.indexOf('/') >= 0) {
      const keys = item.split('/');
      delete json[keys[0]][keys[1]]; //TODO:多层级(大于两层)时的删除还没实现
    } else {
      delete json[item];
    }
  });
  if (add.scripts) {
    Object.assign(json.scripts, add.scripts);//TODO:目前只能添加scripts
  }

  fs.writeFileSync(path, JSON.stringify(json, null, "\t"));
}

const copyFile = (from, to) => {
  fs.writeFileSync(to, fs.readFileSync(from));
  //fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
}

const appendFile = (from, to) => {
  fs.appendFileSync(to, fs.readFileSync(from));
}

const readTepmlate = ({ tplPath, options, cb }) => {
  ejs.renderFile(
    tplPath,
    options,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        cb(data);
      }
    }
  )
}

const isFloderExist = fullPath => {
  try {
    const folder = fs.statSync(fullPath).isDirectory();
    return folder;
  }
  catch (e) {
    return false;
  }
}

module.exports = {
  name,
  version,
  waiting,
  downloadPath,
  prompt,
  replaceFileContent,
  replaceJSONContent,
  copyFile,
  readTepmlate,
  appendFile,
  isFloderExist
};