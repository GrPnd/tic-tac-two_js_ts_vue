<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useGameStore } from '../stores/useGameStore';
const router = useRouter()

const gameStore = useGameStore();
const game = computed(() => gameStore.game);
</script>

<template>
    <div v-if="game" class="container">
        <div v-if="game.isWon" class="win-container">
            <div class="winner">Player {{ game.winner }} has won!</div>
            <button class="reset-button" @click="game.resetGame(); router.push('/playgame');">Reset game!</button>
            <button class="button" @click="router.push('/creategame')">Play another game!</button>
        </div>
        <div v-else class="error">Game is ongoing!</div>
    </div>
    <div v-else class="error">No game is created!</div>
</template>