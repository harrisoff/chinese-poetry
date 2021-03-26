const fs = require('fs')
const path = require('path')
const { v4 } = require('uuid')

const { rootDir } = require('../config')

const { beautifyJson } = require('../utils')
const { getCi } = require('./ci')
const { getAuthors } = require('./author')

async function main() {
  const ciList = await getCi();
  const authorList = await getAuthors();

  // author.json 有漏了的
  const otherAuthors = Array.from(new Set(ciList.map(c => c.author)))
    .filter(author => !authorList.map(a => a.name).includes(author))
  authorList.push(...otherAuthors.map(name => {
    return {
      _id: v4(),
      name,
      description: '',
      short_description: ''
    }
  }))

  console.log(`词 ${ciList.length} 条`)
  console.log(`词人 ${authorList.length} 条`)
  console.log(`未收录词人 ${otherAuthors.length} 条`)

  fs.writeFileSync(path.join(rootDir, 'ci/_author.full.json'), beautifyJson(authorList))
  fs.writeFileSync(path.join(rootDir, 'ci/_ci.full.json'), beautifyJson(ciList))
}

main();
