<script setup lang="ts">
import { useUserDataStore } from '@/stores/userDataStore';

const store = useUserDataStore();
</script>

<template>
  <div v-if="store.jwt">JWT: {{ store.jwt }}</div>
  <div v-else>No JWT</div>
  <br/>
  <div v-if="store.refreshToken">Refreshtoken: {{ store.refreshToken }}</div>
  <div v-else>No refreshToken</div>
</template>
