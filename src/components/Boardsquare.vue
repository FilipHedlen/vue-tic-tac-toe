<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const emit = getCurrentInstance()?.emit;

const props = defineProps({
  value: String,
});

const makeMove = () => {
  if (emit) {
    emit('make-move');
  }
};
</script>

<template>
  <button class="square" @click="makeMove">{{ props.value }}</button>
</template>

<style scoped>
.square {
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  width: 100px;
  height: 100px;
  color: #ffffff;
}
</style>