<script setup lang="ts">
import { ref } from 'vue';
import Gameboard from './components/Gameboard.vue';

const gameStarted = ref(false);

const startGame = () => {
  gameStarted.value = true;
};
</script>

<template>
 <div id="app">
    <Player @start="startGame" v-if="!gameStarted" />
    <Gameboard v-else />
  </div>
</template>

<style scoped>

</style>
