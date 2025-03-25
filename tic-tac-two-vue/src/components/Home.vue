<script setup lang="ts">
import Login from '../components/Login.vue'
import { useUserDataStore } from '../stores/useUserDataStore';
const store = useUserDataStore();
</script>

<template>
    <h1>Home page</h1>
    <div v-if="store.email.length > 0">
        Logged in as {{ store.email }}
    </div>
    <div v-else>
        <Login />
    </div>
</template>
