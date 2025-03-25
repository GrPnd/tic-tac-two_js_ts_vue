<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useGameStore } from '../stores/useGameStore';

const gameStore = useGameStore();
const game = reactive(gameStore.game);


const arrows = [
    { class: 'up-left', symbol: '↖' },
    { class: 'up', symbol: '↑' },
    { class: 'up-right', symbol: '↗' },
    { class: 'left', symbol: '←' },
    { class: 'center', symbol: '' },
    { class: 'right', symbol: '→' },
    { class: 'down-left', symbol: '↙' },
    { class: 'down', symbol: '↓' },
    { class: 'down-right', symbol: '↘' }
];


const currentPlayerCanMovePieceAndGrid = computed(() => game.currentPlayerCanMovePieceAndGrid());
</script>

<template>
    <div class="player-info-panel">
        <div class="current-player">Current player: {{ game.currentPlayer }}</div>
        <div class="remaining-pieces-x">Remaining Pieces X: {{ game.remainingPiecesX }}</div>
        <div class="remaining-pieces-o">Remaining Pieces O: {{ game.remainingPiecesO }}</div>
    </div>
    <div class="options-panel">
        <div class="new-piece">Press to place a new piece</div>
        <div v-if="currentPlayerCanMovePieceAndGrid" class="piece-move">Drag your own piece to an empty cell</div>
        <div v-if="currentPlayerCanMovePieceAndGrid" class="grid-panel">Choose a direction where to move the grid</div>
        <div v-if="currentPlayerCanMovePieceAndGrid" class="grid-arrows-panel">
            <button v-for="arrow in arrows" :key="arrow.class" :class="['arrow-btn', arrow.class]"
                :disabled="arrow.class === 'center'" @click="game.moveGrid(arrow.class)">
                {{ arrow.symbol }}
            </button>
        </div>
    </div>
</template>