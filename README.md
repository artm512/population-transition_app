# population-transition_app

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## api
### 人口情報取得API（県毎）
#### アクセスURL
```
/getPopulation
```
#### リクエスト(POST)
JSON Key|型|必須|値の説明
---|---|---|---
prefCode|文字列|○|県コード

#### レスポンスデータ 例
```
{
  "boundaryYear": 2015,
  "data": [
    {
      "label": "総人口",
      "data": [
        { "year":1960, "value":123456 },
        ...
      ]
    },
    {
      "label": "年少人口",
      "data": [
        { "year":1960, "value":123456, "rate":12.3 },
        ...
      ]
    },
    {
      "label": "生産年齢人口",
      "data": [
        {"year":1960,"value":123456,"rate":12},
        ...
      ]
    },
    {
      "label": "老年人口",
      "data": [
        {"year":1960,"value":12345,"rate":1.2,
        ...
      ]  
    }
  ]
}
```
