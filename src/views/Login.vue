<template>
  <div class="flex justify-center items-center min-w-screen min-h-screen">
    <div class="flex flex-col bg-white rounded-lg shadow-lg p-6 w-1/4">
      <span class="font-bold text-2xl">Login</span>
      <label class="pt-6 pb-2 font-medium" for="email">
        Email
      </label>
      <input
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        type="email"
        id="email"
        minlength="6"
        v-model="email"
      />
      <label class="pt-6 pb-2 font-medium" for="password">
        Password
      </label>
      <input
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        type="password"
        id="password"
        minlength="6"
        v-model="password"
      />
      <button
        class="bg-indigo-700 text-white focus:outline-none focus:shadow-outline font-medium rounded-lg p-2 mt-10 focus:shadow-outline"
        type="submit"
        @click="login"
      >
        Sign in
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['signIn']),
    async login() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      const user = await this.signIn(credentials);
      if (user) {
        this.$router.push({ path: `/contacts/${user.id}` });
      }
    },
  },
};
</script>

<style></style>
