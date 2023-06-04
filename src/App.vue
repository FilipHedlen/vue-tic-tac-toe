<script setup lang="ts">
import { ref, provide } from 'vue';
import Player from './components/Player.vue';
import Gameboard from './components/Gameboard.vue';
import Scoreboard from './components/Scoreboard.vue';

const gameStarted = ref(false);
const playersData = ref({
  player1: '',
  player2: '',
});
const player1Score = ref(0);
const player2Score = ref(0);

const startGame = (data: { player1: string; player2: string }) => {
  gameStarted.value = true;
  playersData.value = data;
};

const handleEndGame = () => {
  gameStarted.value = false;
  playersData.value = { player1: '', player2: '' };
  player1Score.value = 0;
  player2Score.value = 0;
};

provide('playersData', playersData);
provide('player1Score', player1Score);
provide('player2Score', player2Score);
provide('startGame', startGame);
</script>

<template>
  <div>
    <Player :startGame="startGame" v-if="!gameStarted"></Player>
    <Gameboard v-if="gameStarted" :playersData="playersData" :gameStarted="gameStarted" @end-game="handleEndGame" />
    <Scoreboard v-if="gameStarted" :player1Score="player1Score" :player2Score="player2Score" />
  </div>
</template>

<style scoped>
</style>