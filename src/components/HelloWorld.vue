<script setup>
import { onMounted, watch } from 'vue';
import {
  canvasInit,
  drawScreen,
  drawFlashTitle,
  page,
} from '../composables/canvasUtils.js';

onMounted(() => {
  canvasInit('myCanvas');
  drawScreen();
});

watch(page, (step) => {
  if (step === 1) {
    drawFlashTitle();
  }
});

defineProps({
  msg: String,
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
