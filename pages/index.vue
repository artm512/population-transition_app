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
          <input :id="`pref__checkbox-${data.prefCode}`" type="checkbox" />{{
            data.prefName
          }}
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
// dummyData
const DUMMY_PREF = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
  { prefCode: 3, prefName: '岩手県' },
  { prefCode: 4, prefName: '宮城県' },
  { prefCode: 5, prefName: '秋田県' },
  { prefCode: 6, prefName: '山形県' },
  { prefCode: 7, prefName: '福島県' },
  { prefCode: 8, prefName: '茨城県' },
  { prefCode: 9, prefName: '栃木県' },
  { prefCode: 10, prefName: '群馬県' },
  { prefCode: 11, prefName: '埼玉県' },
  { prefCode: 12, prefName: '千葉県' },
  { prefCode: 13, prefName: '東京都' },
  { prefCode: 14, prefName: '神奈川県' },
  { prefCode: 15, prefName: '新潟県' },
  { prefCode: 16, prefName: '富山県' },
  { prefCode: 17, prefName: '石川県' },
  { prefCode: 18, prefName: '福井県' },
  { prefCode: 19, prefName: '山梨県' },
  { prefCode: 20, prefName: '長野県' },
  { prefCode: 21, prefName: '岐阜県' },
  { prefCode: 22, prefName: '静岡県' },
  { prefCode: 23, prefName: '愛知県' },
  { prefCode: 24, prefName: '三重県' },
  { prefCode: 25, prefName: '滋賀県' },
  { prefCode: 26, prefName: '京都府' },
  { prefCode: 27, prefName: '大阪府' },
  { prefCode: 28, prefName: '兵庫県' },
  { prefCode: 29, prefName: '奈良県' },
  { prefCode: 30, prefName: '和歌山県' },
  { prefCode: 31, prefName: '鳥取県' },
  { prefCode: 32, prefName: '島根県' },
  { prefCode: 33, prefName: '岡山県' },
  { prefCode: 34, prefName: '広島県' },
  { prefCode: 35, prefName: '山口県' },
  { prefCode: 36, prefName: '徳島県' },
  { prefCode: 37, prefName: '香川県' },
  { prefCode: 38, prefName: '愛媛県' },
  { prefCode: 39, prefName: '高知県' },
  { prefCode: 40, prefName: '福岡県' },
  { prefCode: 41, prefName: '佐賀県' },
  { prefCode: 42, prefName: '長崎県' },
  { prefCode: 43, prefName: '熊本県' },
  { prefCode: 44, prefName: '大分県' },
  { prefCode: 45, prefName: '宮崎県' },
  { prefCode: 46, prefName: '鹿児島県' },
  { prefCode: 47, prefName: '沖縄県' },
]

export default {
  data() {
    return {
      dataSetPref: [],
      dataSetPopulation: {},
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
  mounted() {
    this.dataSetPref = DUMMY_PREF

    this.fillData()
  },
  methods: {
    fillData() {
      this.dataSetPopulation = {
        labels: ['1970', '1980', '1990', '2000', '2010', '2020'],
        datasets: [
          {
            label: '東京都',
            borderColor:
              '#' + Math.floor(Math.random() * 16777215).toString(16),
            fill: false,
            lineTension: 0,
            data: [4420480, 5420480, 6405319, 6938006, 7194556, 7272830],
          },
          {
            label: '愛知県',
            borderColor:
              '#' + Math.floor(Math.random() * 16777215).toString(16),
            fill: false,
            lineTension: 0,
            data: [5386163, 6221638, 6690603, 7043300, 7410719, 7505224],
          },
        ],
      }
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
