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
@import '~/assets/css/mixin.scss';

.checkList {
  display: grid;
  padding-left: 0;
  list-style-type: none;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;

  @include mq(sm) {
    grid-template-columns: repeat(4, 1fr);
  }

  @include mq(md) {
    grid-template-columns: repeat(8, 1fr);
  }

  // .checkList__item
  &__item {
    padding: 0 5px;
    text-align: left;
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
