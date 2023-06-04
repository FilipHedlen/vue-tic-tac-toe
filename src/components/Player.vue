<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['startGame']);

const player1Name = ref('');
const player2Name = ref('');
const formVisible = ref(true);

const startGame = (event: Event) => {
  event.preventDefault();
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
        <h2>Spelare</h2>
        <div class="inputContainer">
          <label for="player1">Spelare X:</label>
          <input v-model="player1Name" type="text" />
        </div>
        
        <div class="inputContainer">
          <label for="player2">Spelare O:</label>
          <input v-model="player2Name" type="text" />
        </div>
        
        <div class="buttonContainer">
          <button type="submit">Starta spelet</button>
        </div>
    </form>
  </div>
</template>

<style scoped>
.playerForm {
  display: grid;
  gap: 20px;
  padding: 100px;
  margin: 100px;
}

.inputContainer {
  display: grid;
  grid-template-rows: auto 1fr;
}

.buttonContainer {
  margin-top: 20px;
}
</style>