<template>
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
          @change="handleChangeCheckbox(data.prefCode, data.prefName)"
        />
        {{ data.prefName }}
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    dataSetPref: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleChangeCheckbox(prefCode, prefName) {
      this.$emit('handleChangeCheckbox', prefCode, prefName)
    },
  },
}
</script>

<style module lang="scss">
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
</style>
