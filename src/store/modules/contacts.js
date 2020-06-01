export default {
  state: {
    id: '',
    contacts: [],
  },

  getters: {
    contacts(state) {
      return state.contacts;
    },
  },

  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
  },

  actions: {
    deleteContact({ state }, id) {
      state.contacts = state.contacts.filter((item) => item.id !== id);
    },

    editContact({ state }, contact) {
      state.contacts = [
        ...state.contacts.filter((item) => item.id !== contact.id),
        contact,
      ];
    },

    async updateContacts({ state }) {
      const url = `https://my-json-server.typicode.com/mbredikhin/account-vue/users/${state.id}`;
      const options = {
        method: 'PATCH',
        body: JSON.stringify({ contacts: state.contacts }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const json = await response.json();
        // Show fetch results
        console.log(`After fetch:\n`, json.contacts);
      }
    },

    // eslint-disable-next-line no-unused-vars
    async getContacts({ state }, id) {
      const url = `https://my-json-server.typicode.com/mbredikhin/account-vue/users/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const json = await response.json();
        return json.contacts;
      }
    },
  },
};
