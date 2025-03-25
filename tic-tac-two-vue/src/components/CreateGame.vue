<script setup lang="ts">
import { ref } from 'vue';
import { GameBrain } from '../bll/gameBrain';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/useGameStore';

const game = ref(new GameBrain());
const router = useRouter();
const gameStore = useGameStore();

const selectedGameType = ref('');
const selectedPlayerPiece = ref('');

const startGame = () => {
    if (!selectedGameType.value) return;
    if (selectedGameType.value == 'PvA' && !selectedPlayerPiece.value) return;

    game.value.gameType = selectedGameType.value;

    if (selectedGameType.value == 'PvA' && selectedPlayerPiece.value == 'X') {
        game.value.playerX = 'Player'
        game.value.playerO = 'AI'
    }
    else if (selectedGameType.value == 'PvA' && selectedPlayerPiece.value == 'O') {
        game.value.playerO = 'Player'
        game.value.playerX = 'AI'
    }

    gameStore.game = game.value;
    router.push('/playgame');
}
</script>

<template>
    <select v-model="selectedGameType" class="form-select">
        <option disabled value>Choose game type</option>
        <option value="PvP">Player vs Player</option>
        <option value="PvA">Player vs AI</option>
    </select>

    <select v-if="selectedGameType == 'PvA'" v-model="selectedPlayerPiece" class="form-select">
        <option disabled value>Choose your piece</option>
        <option value="X">X</option>
        <option value="O">O</option>
    </select>

    <button @click="startGame" type="button" class="btn btn-primary mb-3">Play!</button>
</template>