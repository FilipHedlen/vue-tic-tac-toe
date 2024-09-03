<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['startGame']);

const player1Name = ref('');
const player2Name = ref('');
const formVisible = ref(true);

const startGame = (event: Event) => {
  event.preventDefault();

  if (player1Name.value.trim() === '' || player2Name.value.trim() === '') {
    alert('Both players need to enter their names!');
    return;
  }

  const data = {
    player1: player1Name.value,
    player2: player2Name.value,
  };

  props.startGame(data);
  formVisible.value = false;
};
</script>

<template>
  <div>
    <form class="playerForm" v-if="formVisible" @submit="startGame">
        <h2>Players</h2>
        <div class="inputContainer">
          <label for="player1">Player X:</label>
          <input v-model="player1Name" type="text" />
        </div>
        
        <div class="inputContainer">
          <label for="player2">Player O:</label>
          <input v-model="player2Name" type="text" />
        </div>
        
        <div class="buttonContainer">
          <button type="submit">Start the game</button>
        </div>
    </form>
  </div>
</template>

<style scoped>
.playerForm {
  display: grid;
  gap: 20px;
  padding: 2rem;
  margin: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.inputContainer {
  display: grid;
  grid-template-rows: auto 1fr;
}

.buttonContainer {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .playerForm {
    padding: 1rem;
    margin: 1rem;
  }

  .buttonContainer {
    margin-top: 0.5rem;
  }
}
</style>