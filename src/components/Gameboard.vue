<script setup lang="ts">
import { ref } from 'vue';

const currentPlayer = ref(1);
const board = ref([['', '', ''], ['', '', ''], ['', '', '']]);

const makeMove = (row: number, col: number) => {
  if (board.value[row][col] === '') {
    board.value[row][col] = currentPlayer.value === 1 ? 'X' : 'O';
    currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
  }
};

const resetBoard = () => {
  board.value = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer.value = 1;
};
</script>

<template>
    <div>
    <h2>Tre i rad</h2>
    <div class="board">
      <div
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
        class="row"
      >
        <div
          v-for="(square, colIndex) in row"
          :key="colIndex"
          class="square"
          @click="makeMove(rowIndex, colIndex)"
        >
          {{ square }}
        </div>
      </div>
    </div>
    <button @click="resetBoard">Starta om spelet</button>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
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
