const express = require('express')
const axios = require('axios')

const app = express()
const { RESAS_API_KEY } = process.env

const POPULATION_URL_PREFIX =
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode='

// urlencodedとjsonは別々に初期化
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/', async (req, res) => {
  const { prefCode } = req.body
  const url = POPULATION_URL_PREFIX + prefCode
  const responseData = await axios
    .get(url, {
      headers: { 'X-API-KEY': RESAS_API_KEY },
    })
    .then((res) => {
      return res.data.result
    })
  res.json(responseData)
})

module.exports = {
  path: '/getPopulation',
  handler: app,
}
