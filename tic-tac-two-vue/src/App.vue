<script setup lang="ts">
import { reactive } from 'vue';
import Header from './components/Header.vue'
import { GameBrain } from './bll/gameBrain';
import GameBoard from './components/GameBoard.vue';

const game = reactive(new GameBrain());
</script>

<template>
  <Header />
  <main class="container" style="margin-top: 80px;">
    <RouterView />
  </main>
</template>