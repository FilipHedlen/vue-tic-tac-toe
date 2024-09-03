<script setup lang="ts">
import { ref, inject, onMounted, computed, getCurrentInstance } from 'vue';
import Boardsquare from './Boardsquare.vue';

const currentPlayer = ref(1);
const players = inject<any>('playersData');
const currentPlayerName = computed(() => {
  return currentPlayer.value === 1 ? players?.value.player1 : players?.value.player2;
});
const board = ref([['', '', ''], ['', '', ''], ['', '', '']]);
const winner = ref('');
const draw = ref(false);
const player1Score = inject<any>('player1Score', null);
const player2Score = inject<any>('player2Score', null);

const winningCombinations = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6],
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
      board.value[Math.floor(b / 3)][b % 3] === currentSymbol &&
      board.value[Math.floor(c / 3)][c % 3] === currentSymbol
    ) {
      winner.value = currentSymbol === 'X' ? players?.value.player1 : players?.value.player2;
      updateScores();
      return;
    }
  }
  if (!board.value.flat().includes('')) {
    draw.value = true;
  }
};

const updateScores = () => {
  if (winner.value === players?.value.player1) {
    player1Score.value += 1;
  } else if (winner.value === players?.value.player2) {
    player2Score.value += 1;
  }
};

const resetBoard = () => {
  board.value = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer.value = 1;
  winner.value = '';
  draw.value = false;
};

const emit = getCurrentInstance()?.emit;
const endGame = () => {
  if (emit) {
    emit('end-game');
  }
}

onMounted(() => {
  currentPlayer.value = 1;
});
</script>

<template>
  <div>
    <h1>Tic Tac Toe</h1>
    <h2 v-if="winner">You won {{ winner }}!</h2>
    <h2 v-else-if="draw">It's a draw!</h2>
    <h3 v-else>Your turn, {{ currentPlayerName }}!</h3>
    <div class="board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div v-for="(square, colIndex) in row" :key="colIndex" class="square" @click="makeMove(rowIndex, colIndex)">
          <Boardsquare :value="square" :makeMove="makeMove" :disabled="square !== '' || winner || draw" />
        </div>
      </div>
    </div>
    <button class="restart-btn" @click="resetBoard">Restart game</button>
    <button class="end-btn" @click="endGame">End game</button>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
}

.row {
  display: flex;
  width: 100%;
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
  flex-grow: 1;
  max-width: 100px;
  max-height: 100px;
  box-sizing: border-box;
}

.restart-btn,
.end-btn {
  width: 100px;
  margin-right: 1rem;
}

@media (max-width: 768px) {
  .board {
    max-width: 100%;
  }

  .square {
    width: 80px;
    height: 80px;
    font-size: 20px;
  }

  .restart-btn,
  .end-btn {
    width: 100%;
    margin: 0.5rem 0;
  }
}
</style>