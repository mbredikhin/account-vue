<template>
  <div
    v-if="isLoggedIn"
    class="h-screen w-screen flex items-center justify-center"
  >
    <div
      v-if="modal.visible"
      @click.self="closeModal"
      class="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 absolute z-10"
    >
      <Modal @cancel="closeModal" :options="modal"></Modal>
    </div>

    <div class="w-1/3 bg-white rounded-lg shadow-lg py-6 px-8">
      <span class="font-bold text-3xl">Contacts</span>
      <div class="py-4">
        <input
          v-model="search"
          type="search"
          placeholder="Search people"
          class="min-w-64 w-2/3 px-4 py-2 bg-gray-200 focus:outline-none focus:bg-white focus:border-solid border-gray-200 border rounded-full p-2 appearance-none leading-normal font-medium"
        />
        <button
          @click="showModal()"
          class="w-10 h-10 float-right rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
        >
          <span class="color-blue-300 text-4xl text-indigo-700 leading-7"
            >+</span
          >
        </button>
      </div>
      <div class="pt-2 overflow-auto h-64">
        <div
          v-for="contact in contactsByName"
          :key="contact.id"
          @click="showModal(contact)"
          class="p-2 mb-2 flex items-center cursor-pointer rounded-lg hover:bg-gray-200"
        >
          <img
            :src="contact.avatar"
            class="w-10 h-10 border shadow rounded-full mr-4"
          />
          <span class="font-medium text-gray-600">{{ contact.name }}</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="h-screen flex justify-center items-center">
    <h1 class="text-white font-bold text-6xl">Access denied 👺</h1>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';

export default {
  components: {
    Modal,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      search: '',
      modal: {
        visible: false,
        id: '',
        name: '',
        email: '',
        address: '',
        phone: '',
        avatar: null,
      },
    };
  },

  async mounted() {
    this.setId(this.id);
    const contacts = await this.getContacts(this.id);
    this.setContacts(contacts);
  },

  computed: {
    ...mapGetters(['contacts']),
    contactsByName() {
      const search = this.search.toLowerCase();
      return this.contacts.filter(
        (contact) => contact.name.toLowerCase().indexOf(search) !== -1,
      );
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },

  methods: {
    ...mapMutations(['setId', 'setContacts']),
    ...mapActions(['getContacts']),

    showModal(contact) {
      if (contact) {
        this.modal = { ...contact, visible: true };
      } else {
        this.modal.visible = true;
      }
    },
    closeModal() {
      this.modal = {
        visible: false,
        id: '',
        name: '',
        email: '',
        address: '',
        phone: '',
        avatar: null,
      };
    },
  },
};
</script>
