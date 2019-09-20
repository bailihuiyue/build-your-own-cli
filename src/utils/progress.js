const colors = require('colors');
const empty = '░';
const full = '█';
const barLength = 20;
progress = ({ txt, percent }) => {
    const finishLength = Math.round(percent * barLength);
    const remainLength = Math.round((1 - percent) * barLength);
    let finishStr = "";
    let remainStr = "";
    let totalStr = "";
    for (let i = 0; i < finishLength; i++) {
        finishStr += full;
    }
    for (let i = 0; i < remainLength; i++) {
        remainStr += empty;
    }
    totalStr = finishStr.green + remainStr.cyan;
    const precStr = percent * 100 + '%';
    console.log(txt.yellow, totalStr, precStr.yellow);
}

module.exports = {
    progress
}