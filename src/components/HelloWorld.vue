<script setup>
import { onMounted, watch } from 'vue';
import {
  canvasInit,
  drawScreen,
  drawScreen2,
  drawFlashTitle,
  page,
} from '../composables/canvasUtils.js';

const props = defineProps({
  msg: String,
});

onMounted(() => {
  canvasInit('myCanvas');
  if (page.value === 0) {
    drawScreen();
  }
  if (page.value === 2) {
    drawScreen2();
  }
});

watch(page, (step) => {
  if (step === 1) {
    drawFlashTitle(props.msg);
  }
});
</script>

<template>
  <canvas width="500" height="500" id="myCanvas"></canvas>
</template>

<style scoped>
#myCanvas {
  background-color: #aaa;
  opacity: 0.5;
}
</style>
