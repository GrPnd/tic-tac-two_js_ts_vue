<script setup lang="ts">
import { ref } from 'vue';
import { useUserDataStore } from '@/stores/userDataStore';
import { IdentityService } from '@/services/IdentityService';
import { useRouter } from 'vue-router';

const store = useUserDataStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const doLogin = async () => {
  const identityService = new IdentityService();
  const response = await identityService.login(email.value, password.value);

  if (response?.data) {
    store.jwt = response.data.jwt;
    store.refreshToken = response.data.refreshToken;
    router.push({ name: 'Home' });
  } else {
    error.value = response.errors?.[0] || 'Login failed';
  }
};
</script>

<template>
<main role="main" class="pb-3">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h1>Log in</h1>

        <div v="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>

        <section>
          <form @submit.prevent="doLogin" id="account" method="post">
            <div class="form-floating mb-3">
              <input v-model="email" class="form-control" autocomplete="username" aria-required="true"
                placeholder="name@example.com" type="email">
              <label class="form-label" for="Input_Email">Email</label>
            </div>

            <div class="form-floating mb-3">
              <input v-model="password" class="form-control" autocomplete="current-password" aria-required="true"
                placeholder="password" type="password">
              <label class="form-label" for="Input_Password">Password</label>
            </div>

            <div>
              <button id="login-submit" type="submit" class="w-100 btn btn-lg btn-primary">Log in</button>
            </div>

            <div>
              <p>
                <a id="forgot-password" href="/Identity/Account/ForgotPassword">Forgot your password?</a>
              </p>
              <p>
                <a href="/Identity/Account/Register?returnUrl=%2F">Register as a new user</a>
              </p>
            </div>
          </form>
        </section>
      </div>

    </div>
  </main>

</template>
