<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue';
import { useGameStore } from '../stores/useGameStore';
import { Timer } from '../bll/timer';

const gameStore = useGameStore();
const game = reactive(gameStore.game);
const timer = new Timer();



onMounted(() => {
    if (game.gameType == 'PvA' && game.currentPlayer == 'X' && game.playerX == 'AI') {
        timer.toggleTimer(game);
    }
});
</script>


<template>
    <div class="timer-and-reset">
        <div class="timer-container">
            <div class="timer-display">Time: 0s</div>
            <button @click="timer.toggleTimer(game)" class="timer-button">Start timer</button>
        </div>
        <button @click="game.resetGame(); timer.resetTimer();" class="reset-button">Reset game</button>
    </div>
</template>