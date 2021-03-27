const fs = require('fs')
const path = require('path')
const { v4 } = require('uuid')

const { rootDir } = require('../config')

const { beautifyJson } = require('../utils')
const { getPoetry } = require('./poetry')
const { getAuthors } = require('./author')

async function main() {
  const tangPoetryList = await getPoetry('tang')
  const songPoetryList = await getPoetry('song')
  const allPoetry = [
    ...tangPoetryList,
    ...songPoetryList,
  ]
  const authorList = await getAuthors()

  // 万一 author.json 有漏了的
  const otherAuthors = Array.from(new Set(allPoetry.map(c => c.author)))
    .filter(author => !authorList.map(a => a.name).includes(author))
  authorList.push(...otherAuthors.map(name => {
    return {
      _id: v4(),
      name,
      description: '',
    }
  }))

  // 万一平仄有漏了的
  const noStrainsList = allPoetry.filter(p => !p.strains)

  console.log(`诗 ${allPoetry.length} 条`)
  console.log(`唐诗 ${tangPoetryList.length} 条`)
  console.log(`宋诗 ${songPoetryList.length} 条`)
  console.log(`无平仄 ${noStrainsList.length} 条`)
  console.log(`诗人 ${authorList.length} 条`)
  console.log(`未收录诗人 ${otherAuthors.length} 条`)

  fs.writeFileSync(path.join(rootDir, 'json/_author.full.json'), beautifyJson(authorList))
  fs.writeFileSync(path.join(rootDir, 'json/_poetry.full.json'), beautifyJson(allPoetry))
}

main()
