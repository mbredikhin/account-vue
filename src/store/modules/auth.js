export default {
  state: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async signIn({ state }, { email, password }) {
      const response = await fetch(
        `https://my-json-server.typicode.com/mbredikhin/account-vue/users?email=${email}&password=${password}`,
      );
      if (response.ok) {
        state.email = email;
        state.password = password;
        state.isLoggedIn = true;
        const [user] = await response.json();
        return user;
      }
    },
  },
};
