<script setup lang="ts">
import { ref, inject, onMounted, computed } from 'vue';
import Boardsquare from './Boardsquare.vue';

const currentPlayer = ref(1);
const players = inject<any>('playersData'); // Update the inject argument to 'any' if you're not using TypeScript
const currentPlayerName = computed(() => {
  return currentPlayer.value === 1 ? players?.value.player1 : players?.value.player2;
});
const board = ref([['', '', ''], ['', '', ''], ['', '', '']]);
const winner = ref('');
const draw = ref(false);

// Winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top left
  [2, 4, 6], // Diagonal from top right
];

const makeMove = (row: number, col: number) => {
  if (board.value[row][col] === '' && !winner.value && !draw.value) {
    board.value[row][col] = currentPlayer.value === 1 ? 'X' : 'O';
    checkWinner(row, col);
    currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
  }
};

const checkWinner = (row: number, col: number) => { 
  const currentSymbol = board.value[row][col];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board.value[Math.floor(a / 3)][a % 3] === currentSymbol &&
      board.value[Math.floor(a / 3)][a % 3] === board.value[Math.floor(b / 3)][b % 3] &&
      board.value[Math.floor(b / 3)][b % 3] === board.value[Math.floor(c / 3)][c % 3]
    ) {
      winner.value = currentSymbol === 'X' ? players?.value.player1 : players?.value.player2;
      return;
    }
  }
  if (!board.value.flat().includes('')) {
    draw.value = true;
  }
};

const resetBoard = () => {
  board.value = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer.value = 1;
  winner.value = '';
  draw.value = false;
};

onMounted(() => {
  currentPlayer.value = 1;
});
</script>

<template>
  <div>
    <h1>Tre i rad</h1>
    <h2 v-if="winner">Du vann {{ winner }}!</h2>
    <h2 v-else-if="draw">Oavgjort!</h2>
    <h3 v-else>Din tur {{ currentPlayerName }}!</h3>
    <div class="board">
        <div v-for="(row, rowIndex) in board" 
        :key="rowIndex" 
        class="row">
        <div v-for="(square, colIndex) in row" 
        :key="colIndex" 
        class="square" 
        @click="makeMove(rowIndex, colIndex)">
        <Boardsquare 
        :value="square" 
        :makeMove="makeMove" 
        :disabled="square !== '' || winner || draw" 
        />
        </div>
        </div>
    </div>
    <button @click="resetBoard">Starta om spelet</button>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.row {
  display: flex;
}

.square {
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  width: 100px;
  height: 100px;
}
</style>