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
    <div v-if="gameStarted" class="game-container">
      <Gameboard :playersData="playersData" :gameStarted="gameStarted" @end-game="handleEndGame" />
      <Scoreboard :player1Score="player1Score" :player2Score="player2Score" />
    </div>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 1rem;
  max-width: 1200px;
  margin: auto;
}

.game-container > :first-child {
  flex-grow: 1;
}

.game-container > :first-child::after {
  content: '';
  display: block;
  width: 2px;
  height: 100%;
  background-color: #ddd;
  margin-left: 2rem;
}

.scoreboard {
  padding-left: 2rem;
}

@media (max-width: 768px) {
  .game-container {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
  }

  .game-container > :first-child::after {
    content: none;
  }

  .scoreboard {
    padding-left: 0;
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .game-container {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .square {
    width: 80px;
    height: 80px;
    font-size: 20px;
  }

  .restart-btn,
  .end-btn {
    width: 100%;
    margin-bottom: 0.5rem; 
  }
}
</style>