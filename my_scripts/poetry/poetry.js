// /json/poet.song.*.json

const path = require('path');
const fs = require('fs');

const { rootDir } = require('../config')
const { getFileJson } = require('../utils')

const poetryDir = path.join(rootDir, 'json');
const strainsDir = path.join(rootDir, 'strains/json');

async function getPoetryFileList(dynasty) {
  const allFileList = await fs.readdirSync(poetryDir);
  const fileNameRegExp = new RegExp(`poet\.${dynasty}\.\\w+\.json`, 'i')
  return allFileList
    .filter(f => fileNameRegExp.test(f))
    .map(f => path.join(poetryDir, f));
}

async function getPoetryList(dynasty) {
  const fileList = await getPoetryFileList(dynasty)
  const task = fileList.map(getFileJson);
  const resultArray = await Promise.all(task);
  return resultArray
    .flat()
    .map(({ id, ...rest }) => {
      return {
        ...rest,
        _id: id,
        dynasty
      }
    });
}

async function getStrainsFileList(dynasty) {
  const allFileList = await fs.readdirSync(strainsDir);
  const fileNameRegExp = new RegExp(`poet.${dynasty}.\\w+.json`, 'i')
  return allFileList
    .filter(f => fileNameRegExp.test(f))
    .map(f => path.join(strainsDir, f));
}

async function getStrainsList(dynasty) {
  const fileList = await getStrainsFileList(dynasty)
  const task = fileList.map(getFileJson);
  const resultArray = await Promise.all(task);
  return resultArray.flat()
}

function genStrainsMap(strainsList) {
  const obj = {}
  strainsList.forEach(({ id, strains }) => {
    obj[id] = strains
  })
  return obj
}

function addStrains(poetryList, strainsMap) {
  return poetryList.map((p) => {
    // 文档说 poet 和 strains 是一一对应的
    // 并不是！
    return {
      ...p,
      strains: strainsMap[p._id]
    }
  })
}

async function getPoetry(dynasty) {
  const poetryList = await getPoetryList(dynasty)
  const strainsList = await getStrainsList(dynasty)
  const strainsMap = genStrainsMap(strainsList)
  return addStrains(poetryList, strainsMap)
}

module.exports = {
  getPoetry
}
