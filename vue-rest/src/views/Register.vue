<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { IdentityService } from '@/services/IdentityService';
import { useUserDataStore } from '@/stores/userDataStore';

const service = new IdentityService();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref<string[]>([]);
const store = useUserDataStore();

const doRegister = async () => {
  errors.value = [];

  // Frontend validation
  if (!firstName.value.trim()) errors.value.push("First name is required.");
  if (!lastName.value.trim()) errors.value.push("Last name is required.");
  if (!email.value.trim()) errors.value.push("Email is required.");
  if (!password.value) errors.value.push("Password is required.");
  if (password.value.length < 6) errors.value.push("Password must be at least 6 characters.");
  if (password.value !== confirmPassword.value) errors.value.push("Passwords do not match.");

  if (errors.value.length > 0) return;

  const result = await service.register({
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value
  });

  if (result.errors?.length) {
    errors.value = result.errors;
  } else if (result.data) {
    store.jwt = result.data.jwt;
    store.refreshToken = result.data.refreshToken;
    router.push({ name: 'Home' });
  } else {
    errors.value.push('Error')
  }
};
</script>



<template>
  <h1>Register</h1>

  <ul class="text-danger" v-if="errors.length">
    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
  </ul>

  <form id="registerForm" @submit.prevent="doRegister" novalidate>
    <div class="form-group mb-3">
      <label class="control-label" for="firstName">First Name</label>
      <input v-model="firstName" class="form-control" id="firstName" type="text" />
    </div>

    <div class="form-group mb-3">
      <label class="control-label" for="lastName">Last Name</label>
      <input v-model="lastName" class="form-control" id="lastName" type="text" />
    </div>

    <div class="form-group mb-3">
      <label class="control-label" for="email">Email</label>
      <input v-model="email" class="form-control" id="email" type="email" />
    </div>

    <div class="form-group mb-3">
      <label class="control-label" for="password">Password</label>
      <input v-model="password" class="form-control" id="password" type="password" />
    </div>

    <div class="form-group mb-4">
      <label class="control-label" for="confirmPassword">Confirm Password</label>
      <input v-model="confirmPassword" class="form-control" id="confirmPassword" type="password" />
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary">Register</button>
    </div>
  </form>
</template>
