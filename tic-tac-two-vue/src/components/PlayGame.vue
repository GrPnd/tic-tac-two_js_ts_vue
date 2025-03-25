<script setup lang="ts">
import { reactive, onMounted, watch, computed } from 'vue';
import { useGameStore } from '../stores/useGameStore';
import GameBoard from './GameBoard.vue';
import PlayerOptions from './PlayerOptions.vue';
import { AI } from '../bll/ai '
import { WinLogic } from '../bll/winLogic';
import { useRouter } from 'vue-router';
import TimerAndReset from './TimerAndReset.vue'


const router = useRouter()
const gameStore = useGameStore();
const winLogic = new WinLogic()

// const game = reactive(gameStore.game);
// const ai = new AI(game);

const game = computed(() => gameStore.game);
const ai = computed(() => (game.value ? new AI(game.value) : null));

onMounted(() => {
    if (!game.value) return;

    if (game.value.gameType == 'PvA' && game.value.currentPlayer == 'X' && game.value.playerX == 'AI') {
        ai.value?.makeAMove();
    }
});

watch(
    () => game.value?.currentPlayer,
    () => {
        if (!game.value) return;
        checkAITurn();
        checkWinner();
    }
);

function checkAITurn() {
    if (!game.value) return;

    if (game.value.gameType === 'PvA' && game.value.currentPlayer === 'X' && game.value.playerX === 'AI') {
        ai.value?.makeAMove();
    } else if (game.value.gameType === 'PvA' && game.value.currentPlayer === 'O' && game.value.playerO === 'AI') {
        ai.value?.makeAMove();
    }
}

function checkWinner() {
    if (!game.value) return;

    const result = winLogic.checkWin(game.value);
    if (result !== null) {
        game.value.winner = result;
        game.value.isWon = true;
        router.push('/winscreen');
    }
}

</script>

<template>
    <div v-if="game" class="container">
        <TimerAndReset />
        <GameBoard :gameInstance="game" @cell-click="(x, y) => game.makeAMove(x, y)" />
        <PlayerOptions />
    </div>
    <div v-else class="error">No game is created!</div>
</template>