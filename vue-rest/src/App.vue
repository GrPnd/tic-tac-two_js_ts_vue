<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <Header />
  <main class="container">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped></style>
