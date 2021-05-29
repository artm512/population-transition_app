<template>
  <div :class="$style.container">
    <h1 :class="$style.title">都道府県毎の人口推移</h1>
    <h2 :class="$style.titleLv02">都道府県</h2>
    <ListCheckbox
      :data-set-pref="mappedDataSetProf"
      @handleChangeCheckbox="handleChangeCheckbox"
    />
    <div :class="$style.chart">
      <line-chart
        :chart-data="dataSetPopulation"
        :options="chartOption"
      ></line-chart>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const CHART_YEARS = ['1970', '1980', '1990', '2000', '2010', '2020']
const POPULATION_URL_PREFIX =
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode='

export default {
  async asyncData({ $config }) {
    const PREFECTURES_URL =
      'https://opendata.resas-portal.go.jp/api/v1/prefectures'
    const dataSetPref = await axios
      .get(PREFECTURES_URL, {
        headers: { 'X-API-KEY': $config.resasApiKey },
      })
      .then((res) => {
        return res.data.result
      })
    return { dataSetPref }
  },
  data() {
    return {
      dataSetPref: [], // from asyncData
      dataSetPopulation: {
        labels: CHART_YEARS,
        datasets: [],
      },
      chartOption: {
        responsive: true,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '年度',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '人口数',
              },
              ticks: {
                fontSize: 10,
              },
            },
          ],
        },
      },
    }
  },
  computed: {
    population_url() {
      return (prefCode) => {
        return POPULATION_URL_PREFIX + prefCode
      }
    },
    mappedDataSetProf() {
      return this.dataSetPref.map((obj) => {
        return { ...obj, checked: false }
      })
    },
  },
  methods: {
    handleChangeCheckbox(prefCode, prefName) {
      const isViewLine = this.mappedDataSetProf.find(
        (obj) => obj.prefCode === prefCode
      ).checked

      if (isViewLine) {
        this.addData(prefCode, prefName)
      } else {
        this.removeData(prefCode)
      }
    },
    addData(prefCode, prefName) {
      this.getApiResas(this.population_url(prefCode))
        .then((res) => {
          const { data: resData } = res.data.result.data[0]
          const setData = CHART_YEARS.map((year) => {
            const targetObj = resData.find((obj) => {
              return obj.year === Number(year)
            })
            return targetObj.value
          })

          const newPopulationDatasets = [
            ...this.dataSetPopulation.datasets,
            {
              prefCode,
              label: prefName,
              borderColor:
                '#' + Math.floor(Math.random() * 16777215).toString(16),
              fill: false,
              lineTension: 0,
              data: setData,
            },
          ]

          const sortedPopulationDatasets = newPopulationDatasets.sort(
            (a, b) => {
              if (a.prefCode < b.prefCode) {
                return -1
              } else {
                return 1
              }
            }
          )

          this.dataSetPopulation = {
            labels: CHART_YEARS,
            datasets: sortedPopulationDatasets,
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('エラー：', err.message)

          // checkboxを戻す
          this.dataSetPref = this.dataSetPref.map((obj) => {
            if (obj.prefCode === prefCode) {
              obj.checked = false
            }
            return obj
          })
        })
    },
    removeData(prefCode) {
      const newPopulationDatasets = this.dataSetPopulation.datasets.filter(
        (obj) => {
          return obj.prefCode !== prefCode
        }
      )

      this.dataSetPopulation = {
        labels: CHART_YEARS,
        datasets: newPopulationDatasets,
      }
    },
    getApiResas(url) {
      return axios.get(url, {
        headers: { 'X-API-KEY': this.$config.resasApiKey },
      })
    },
  },
}
</script>

<style module lang="scss">
.container {
  max-width: 980px;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
}

.title {
  position: relative;
  padding: 0 1rem 0.7rem;
  display: inline-block;
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 20px;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    content: '';
    background-image: repeating-linear-gradient(
      -45deg,
      #000,
      #000 1px,
      transparent 2px,
      transparent 5px
    );
    background-size: 7px 7px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
}

.titleLv02 {
  border-left: 4px solid #000ba5;
  font-size: 1rem;
  margin: 10px;
  padding: 0.2rem 0.7rem;
  text-align: left;
}

.chart {
  margin: 50px auto;
  max-width: 600px;
  padding: 0 10px;
}
</style>
