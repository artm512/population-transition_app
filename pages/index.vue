<template>
  <div :class="$style.container">
    <h1 :class="$style.title">都道府県毎の人口推移</h1>
    <h2 :class="$style.titleLv02">都道府県</h2>
    <ul :class="$style.checkList">
      <li
        v-for="data in dataSetPref"
        :key="data.prefCode"
        :class="$style.checkList__item"
      >
        <label
          :class="$style.checkList__checkbox"
          :for="`pref__checkbox-${data.prefCode}`"
        >
          <input
            :id="`pref__checkbox-${data.prefCode}`"
            v-model="data.checked"
            type="checkbox"
            @change="addData(data.prefCode, data.prefName)"
          />
          {{ data.prefName }}
        </label>
      </li>
    </ul>
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
const PREFECTURES_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
const POPULATION_URL_PREFIX =
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode='

export default {
  data() {
    return {
      dataSetPref: [],
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
  },
  mounted() {
    this.getApiResas(PREFECTURES_URL)
      .then((res) => {
        this.dataSetPref = res.data.result.map((obj) => {
          return { ...obj, checked: false }
        })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('エラー：', err.message)
      })
  },
  methods: {
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

          const populationDatasets = [
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

          this.dataSetPopulation = {
            labels: CHART_YEARS,
            datasets: populationDatasets,
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
    getApiResas(url) {
      return axios.get(url, {
        headers: { 'X-API-KEY': process.env.RESAS_API_KEY },
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

.checkList {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  list-style-type: none;

  // .checkList__item
  &__item {
    padding: 10px;
  }

  // .checkList__checkbox
  &__checkbox {
    cursor: pointer;

    > input[type='checkbox'] {
      cursor: pointer;
      margin-right: 5px;
    }
  }
}

.chart {
  margin: 30px auto;
  max-width: 600px;
  padding: 0 10px;
}
</style>
