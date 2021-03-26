// /ci/ci.song.*.json

const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

const { rootDir } = require('../config')
const { getFileJson } = require('../utils')

const ciDir = path.join(rootDir, 'ci');
const fileNameRegExp = /ci\.song\.\w+\.json/i;

async function getFileList() {
  const allFileList = await fs.readdirSync(ciDir);
  return allFileList
    .filter(f => fileNameRegExp.test(f))
    .map(f => path.join(ciDir, f));
}

async function getCi() {
  const fileList = await getFileList();
  const task = fileList.map(getFileJson);
  const resultArray = await Promise.all(task);
  return resultArray
    .flat()
    .map(c => {
      return {
        ...c,
        _id: v4()
      }
    });
}

module.exports = {
  getCi
}
