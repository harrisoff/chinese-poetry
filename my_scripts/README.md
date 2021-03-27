# my_scripts

诗词和作者分别整合到一个文件（然后准备导入到 mongodb）

```bash
npm run parse:all
```

首先分别合并词的目录 `/ci` 和诗的目录 `/json`，然后再次合并。

## 词和作者

```ts
// /ci/_author.full.json
interface CiAuthor {
  _id: string;
  name: string;
  description: string;
  short_description: string;
}

// /ci/_ci.full.json
interface Ci {
  _id: string;
  title: string;
  author: string;
  paragraphs: string[];
  tags: string[];
}
```

## 诗和作者

```ts
// /json/_author.full.json
interface PoetryAuthor {
  _id: string;
  name: string;
  description: string;
  short_description: '';
  dynasty: 'tang' | 'song';
}

// /json/_poetry.full.json
interface Poetry {
  _id: string;
  title: string;
  author: string;
  paragraphs: string[];
  tags: string[];
  strains: string[];
  dynasty: 'tang' | 'song';
}
```

## 全部

```ts
// /_author.full.json
type Author = CiAuthor & { type: 'ci' } | PoetryAuthor & { type: 'poetry' }
// /_poetry-ci.full.json
type PoetryAndCi = Ci & { type: 'ci' } | Poetry & { type: 'poetry' }
```
