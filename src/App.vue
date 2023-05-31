<script setup lang="ts">
import { ref, provide } from 'vue';
import Player from './components/Player.vue';
import Gameboard from './components/Gameboard.vue';

const gameStarted = ref(false);
const playersData = ref({
  player1: '',
  player2: '',
});

const startGame = (data: { player1: string; player2: string }) => {
  gameStarted.value = true;
  playersData.value = data;
};

provide('playersData', playersData);
provide('startGame', startGame);
</script>

<template>
  <div>
    <Player :startGame="startGame"></Player>
    <Gameboard v-if="gameStarted" :playersData="playersData"></Gameboard>
  </div>
</template>

<style scoped>
</style>