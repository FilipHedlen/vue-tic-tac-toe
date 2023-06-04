<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';

const props = defineProps(['player1', 'player2']);
const player1Score = ref(0);
const player2Score = ref(0);

onMounted(() => {
  const storedScores = localStorage.getItem('scores');
  if (storedScores) {
    const { player1Score: p1Score, player2Score: p2Score } = JSON.parse(storedScores);
    player1Score.value = p1Score;
    player2Score.value = p2Score;
  }
});

watch([player1Score, player2Score], () => {
  const scores = {
    player1Score: player1Score.value,
    player2Score: player2Score.value,
  };
  localStorage.setItem('scores', JSON.stringify(scores));
});
</script>

<template>
  <div>
    <h2>Resultattavla</h2>
    <p>{{ props.player1 }}: {{ player1Score }}</p>
    <p>{{ props.player2 }}: {{ player2Score }}</p>
  </div>
</template>

<style scoped>
</style>