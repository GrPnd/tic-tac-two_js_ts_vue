<script setup lang="ts">
import { ref } from 'vue';
import { useUserDataStore } from '../stores/useUserDataStore';

const store = useUserDataStore();

const email = ref('');
const password = ref('');

const doLogin = () => {
    if (email.value === email.value && password.value === password.value) {
        store.email = email.value;
        store.password = password.value;
    }
}
</script>

<template>
    <form @submit.prevent="() => doLogin()">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">Your name is: {{ email }}</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
            <div id="passwordHelp" class="form-text">Your password is: {{ password }}</div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>
