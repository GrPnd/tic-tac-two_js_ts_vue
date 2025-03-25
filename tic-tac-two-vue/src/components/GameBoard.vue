<script setup lang="ts">
import { ref, computed } from 'vue';
import { GameBrain } from '../bll/gameBrain';

interface Props {
    gameInstance: GameBrain;
}

const props = defineProps<Props>();

const game = props.gameInstance;
// Make the board reactive using computed property
const board = computed(() => game.board);

// Drag and drop handlers
const handleDragStart = (event: DragEvent, x: number, y: number) => {
    event.dataTransfer?.setData('text/plain', JSON.stringify({ x, y }));
};

const allowDrop = (event: DragEvent) => {
    event.preventDefault();
};

const handleDrop = (event: DragEvent, x: number, y: number) => {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    console.log(data);
    if (!data) return;

    const { x: dragX, y: dragY } = JSON.parse(data);

    const draggedCell = game.board[dragX][dragY];
    const targetCell = game.board[x][y];

    // Ensure the game is not stopped and that the move is valid
    if (game.gameState === 'Stopped') return;

    if (!game.currentPlayerCanMovePieceAndGrid()) {
        console.log('You cannot move a piece');
        return;
    }

    if (game.currentPlayer !== draggedCell) {
        console.log('You can only move your own pieces');
        return;
    }

    if (targetCell !== undefined) {
        console.log('Invalid move');
        return;
    }

    console.log('did it!!')
    // Perform the cell swap logic
    game.board[dragX][dragY] = targetCell;
    game.board[x][y] = draggedCell;

    // Re-render the board after the move
    game.changeTurn();

};
</script>

<template>
    <table class="board">
        <tr v-for="(row, indexRow) in board" :key="indexRow">
            <td v-for="(cell, indexCol) in row" :key="indexCol" @click="$emit('cell-click', indexRow, indexCol)"
                class="cell" :class="{ 'grid': game.isGridCell(indexRow, indexCol) }"
                :draggable="cell === game.currentPlayer && game.currentPlayerCanMovePieceAndGrid()"
                @dragstart="handleDragStart($event, indexRow, indexCol)" @dragover="allowDrop"
                @drop="handleDrop($event, indexRow, indexCol)">
                &nbsp;{{ cell ?? ' ' }}&nbsp;
            </td>
        </tr>
    </table>
</template>