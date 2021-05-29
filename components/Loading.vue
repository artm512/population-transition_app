<template>
  <div v-show="loading" :class="$style.wrapper">
    <div :class="$style.loading"></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style module lang="scss">
.wrapper {
  background: rgba(#333, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  font-size: 14px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  animation: load 1.1s infinite ease;
  transform: translateZ(0);
}

@keyframes load {
  0%,
  100% {
    box-shadow: 0 -2.6em 0 0 #fff, 1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2),
      2.5em 0 0 0 rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0 rgba(255, 255, 255, 0.2),
      0 2.5em 0 0 rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0 rgba(255, 255, 255, 0.2),
      -2.6em 0 0 0 rgba(255, 255, 255, 0.5),
      -1.8em -1.8em 0 0 rgba(255, 255, 255, 0.7);
  }
  12.5% {
    box-shadow: 0 -2.6em 0 0 rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0 #fff,
      2.5em 0 0 0 rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0 rgba(255, 255, 255, 0.2),
      0 2.5em 0 0 rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0 rgba(255, 255, 255, 0.2),
      -2.6em 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0 rgba(255, 255, 255, 0.5);
  }
  25% {
    box-shadow: 0 -2.6em 0 0 rgba(255, 255, 255, 0.5),
      1.8em -1.8em 0 0 rgba(255, 255, 255, 0.7), 2.5em 0 0 0 #fff,
      1.75em 1.75em 0 0 rgba(255, 255, 255, 0.2),
      0 2.5em 0 0 rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0 rgba(255, 255, 255, 0.2),
      -2.6em 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2);
  }
  37.5% {
    box-shadow: 0 -2.6em 0 0 rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0 rgba(255, 255, 255, 0.5),
      2.5em 0 0 0 rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0 #fff,
      0 2.5em 0 0 rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0 rgba(255, 255, 255, 0.2),
      -2.6em 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 -2.6em 0 0 rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2),
      2.5em 0 0 0 rgba(255, 255, 255, 0.5),
      1.75em 1.75em 0 0 rgba(255, 255, 255, 0.7), 0 2.5em 0 0 #fff,
      -1.8em 1.8em 0 0 rgba(255, 255, 255, 0.2),
      -2.6em 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2);
  }
  62.5% {
    box-shadow: 0 -2.6em 0 0 rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2),
      2.5em 0 0 0 rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0 rgba(255, 255, 255, 0.5),
      0 2.5em 0 0 rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0 #fff,
      -2.6em 0 0 0 rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2);
  }
  75% {
    box-shadow: 0 -2.6em 0 0 rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2),
      2.5em 0 0 0 rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0 rgba(255, 255, 255, 0.2),
      0 2.5em 0 0 rgba(255, 255, 255, 0.5),
      -1.8em 1.8em 0 0 rgba(255, 255, 255, 0.7), -2.6em 0 0 0 #fff,
      -1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2);
  }
  87.5% {
    box-shadow: 0 -2.6em 0 0 rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0 rgba(255, 255, 255, 0.2),
      2.5em 0 0 0 rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0 rgba(255, 255, 255, 0.2),
      0 2.5em 0 0 rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0 rgba(255, 255, 255, 0.5),
      -2.6em 0 0 0 rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0 #fff;
  }
}
</style>
