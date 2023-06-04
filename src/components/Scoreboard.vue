<script setup lang="ts">
import { ref, onMounted, inject, watch } from 'vue';

const props = defineProps(['player1Score', 'player2Score']);
const player1Score = ref(props.player1Score);
const player2Score = ref(props.player2Score);

const playersData = inject<any>('playersData');

watch(() => props.player1Score, (newScore) => {
  player1Score.value = newScore;
});

watch(() => props.player2Score, (newScore) => {
  player2Score.value = newScore;
});

onMounted(() => {
  const storedScores = localStorage.getItem('scores');
  if (storedScores) {
    const { player1Score: p1Score, player2Score: p2Score } = JSON.parse(storedScores);
    player1Score.value = p1Score;
    player2Score.value = p2Score;
  }
});
</script>

<template>
  <div>
    <h2>Resultattavla</h2>
    <p>{{ playersData.player1 }}: {{ player1Score }}</p>
    <p>{{ playersData.player2 }}: {{ player2Score }}</p>
  </div>
</template>


<style scoped>
</style>