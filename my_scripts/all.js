const path = require('path');
const fs = require('fs');

const { rootDir } = require('./config')

const { getFileJson, beautifyJson } = require('./utils')

// author
const poetryAuthorFilePath = path.join(rootDir, 'json/_author.full.json')
const ciAuthorFilePath = path.join(rootDir, 'ci/_author.full.json')
// poetry + ci
const poetryFilePath = path.join(rootDir, 'json/_poetry.full.json')
const ciFilePath = path.join(rootDir, 'ci/_ci.full.json')

async function concatAuthor() {
  const poetryAuthorList = await getFileJson(poetryAuthorFilePath)
  const ciAuthorList = await getFileJson(ciAuthorFilePath)

  const allAuthorList = [
    ...poetryAuthorList.map(e => {
      return {
        ...e,
        type: 'poetry'
      }
    }),
    ...ciAuthorList.map(e => {
      return {
        ...e,
        type: 'ci'
      }
    }),
  ]

  console.log(`诗词作者共 ${allAuthorList.length} 条`)

  fs.writeFileSync(path.join(rootDir, '_author.full.json'), beautifyJson(allAuthorList))
}
async function concatPoetry() {
  const poetryList = await getFileJson(poetryFilePath)
  const ciList = await getFileJson(ciFilePath)

  const allList = [
    ...poetryList.map(e => {
      return {
        ...e,
        type: 'poetry',
      }
    }),
    ...ciList.map(e => {
      return {
        ...e,
        type: 'ci',
      }
    }),
  ]

  console.log(`诗词共 ${allList.length} 条`)

  fs.writeFileSync(path.join(rootDir, '_poetry-ci.full.json'), beautifyJson(allList))
}

async function main() {
  console.log('\r\n')
  concatPoetry()
  concatAuthor()
}

main()
