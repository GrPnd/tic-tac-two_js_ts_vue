<script setup lang="ts">
import { useUserDataStore } from '@/stores/userDataStore';
import { RouterLink } from 'vue-router';

const userStore = useUserDataStore();
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">WebApp</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/department">Departments</RouterLink>
            </li>
          </ul>

          <ul v-if="!userStore.jwt" class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/register">Register</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/login">Login</RouterLink>
            </li>
          </ul>

          <ul v-else class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/">Logout</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  </header>
</template>
