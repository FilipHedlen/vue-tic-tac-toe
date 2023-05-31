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
  // Call the startGame function from the parent component
  props.startGame(data);
  formVisible.value = false;
};
</script>

<template>
  <div>
    <form v-if="formVisible" @submit="startGame">
        <h2>Spelare</h2>
        <label for="player1">Spelare 1:</label>
        <input v-model="player1Name" type="text" placeholder="Player 1" />
        
        <label for="player2">Spelare 2:</label>
        <input v-model="player2Name" type="text" placeholder="Player 2" />
        <button type="submit">Starta spelet</button>
    </form>
  </div>
</template>

<style scoped>
</style>