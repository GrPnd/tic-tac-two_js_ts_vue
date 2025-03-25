<script setup lang="ts">
import { useUserDataStore } from '../stores/useUserDataStore';
import { RouterLink, useRouter } from 'vue-router';
const router = useRouter()

const userStore = useUserDataStore();
</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Tic-tac-two</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li v-if="userStore.email.length > 0" class="nav-item">
                        <RouterLink class="nav-link" to="/CreateGame">Create game</RouterLink>
                    </li>
                    <li v-if="userStore.email.length > 0" class="nav-item">
                        <RouterLink class="nav-link" to="/PlayGame">Play game</RouterLink>
                    </li>
                    <li v-if="userStore.email.length > 0" class="nav-item">
                        <RouterLink class="nav-link" to="/WinScreen">Win screen</RouterLink>
                    </li>
                    <li v-if="userStore.email.length > 0" class="nav-item">
                        <a @click="() => { userStore.email = ''; router.push('/'); }" class="nav-link">Logout {{
                            userStore.email }}</a>
                    </li>
                </ul>

            </div>
        </div>
    </nav>

</template>