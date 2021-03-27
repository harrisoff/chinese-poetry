// /json/authors.*.json

const path = require('path');

const { rootDir } = require('../config')
const { getFileJson } = require('../utils')

const tangFilePath = path.join(rootDir, 'json/authors.tang.json')
const songFilePath = path.join(rootDir, 'json/authors.song.json')

async function getAuthors() {
  const tangAuthors = await getFileJson(tangFilePath)
  const songAuthors = await getFileJson(songFilePath)
  return [
    ...tangAuthors.map(({id, name, desc}) => {
      return {
        _id: id,
        name,
        description: desc,
        short_description: '',
        dynasty: 'tang',
      }
    }),
    ...songAuthors.map(({id, name, desc}) => {
      return {
        _id: id,
        name,
        description: desc,
        dynasty: 'song',
      }
    })
  ]
}

module.exports = {
  getAuthors
}
