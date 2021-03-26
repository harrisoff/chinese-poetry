# my_scripts

整合 json 到一个文件（然后准备导入到 mongodb）

## /ci

```ts
// _author.full.json
interface Author {
  description: string;
  name: string;
  short_description: string;
  _id: string;
}

// _ci.full.json
interface Ci {
  author: string;
  paragraphs: string[];
  rhythmic: string;
  _id: string;
}
```

## /json

```ts
// _author.full.json
interface Author {
  _id: string;
  name: string;
  description: string;
  dynasty: 'tang' | 'song';
}

// _poetry.full.json
interface Poetry {
  author: string;
  paragraphs: string[];
  title: string;
  _id: string;
  dynasty: 'tang' | 'song';
  strains: string[];
}
```
