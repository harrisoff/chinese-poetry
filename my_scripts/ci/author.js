// /ci/author.song.json

const path = require('path');
const { v4 } = require('uuid');

const { rootDir } = require('../config')
const { getFileJson } = require('../utils')

const filePath = path.join(rootDir, 'ci/author.song.json')

async function getAuthors() {
  const content = await getFileJson(filePath)
  return content.map(c => {
    return {
      ...c,
      _id: v4()
    }
  })
}

module.exports = {
  getAuthors
}
