<template>
  <div class="bg-white rounded-lg p-8 w-1/3">
    <div class="flex flex-col py-3">
      <label for="name" class="mb-1 font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        minlength="6"
        v-model="name"
        id="name"
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
      />
    </div>

    <div class="flex flex-col py-3">
      <label for="email" class="mb-2 font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        minlength="6"
        v-model="email"
        id="email"
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
      />
    </div>

    <div class="flex flex-col py-3">
      <label for="address" class="mb-2 font-medium text-gray-700">
        Address
      </label>
      <input
        type="text"
        minlength="6"
        v-model="address"
        id="address"
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
      />
    </div>

    <div class="flex flex-col py-3">
      <label for="phone" class="mb-2 font-medium text-gray-700">
        Phone
      </label>
      <input
        type="tel"
        minlength="6"
        v-model="phone"
        id="phone"
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg p-2 block w-full appearance-none leading-normal"
      />
    </div>

    <div class="flex flex-col py-3">
      <label for="photo" class="mb-2 font-medium text-gray-700">
        Photo
      </label>
      <input type="file" id="photo" @change="setAvatar"  />
    </div>

    <div class="py-6">
      <button
        v-if="options.id"
        @click="remove"
        class="py-2 px-5 float-left bg-red-500 rounded-lg hover:shadow-md"
      >
        <span class="font-medium text-white">Delete 🗑️</span>
      </button>

      <button
        @click="submit"
        class="float-right bg-indigo-600 rounded-lg py-2 px-5 border border-indigo-600 hover:shadow-md"
      >
        <span class="font-medium text-white">
          Submit
        </span>
      </button>

      <button
        @click="$emit('cancel')"
        class="float-right bg-white rounded-lg mr-4 py-2 px-5 border border-gray-400 hover:shadow-md"
      >
        <span class="font-medium">Cancel</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    options: {
      // visible, id, name, email, address, phone, avatar
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.options.name,
      email: this.options.email,
      address: this.options.address,
      phone: this.options.phone,
      avatar: this.options.avatar,
    };
  },
  computed: {
    isValid() {
      const valid = this.name && this.email && this.address && this.phone;
      return valid;
    },
  },
  methods: {
    ...mapActions(['editContact', 'deleteContact', 'updateContacts']),

    setAvatar({ target }) {
      let [file] = target.files;
      this.avatar = URL.createObjectURL(file);
    },

    submit() {
      if (this.isValid) {
        const credentials = {
          id: this.options.id || this.uuid(),
          name: this.name,
          email: this.email,
          address: this.address,
          phone: this.phone,
          avatar: this.avatar,
        };
        this.editContact(credentials);
        this.updateContacts();
        this.$emit('cancel');
      } else {
        console.log('Invalid input');
      }
    },
    uuid() {
      return (+new Date()).toString(16);
    },
    remove() {
      console.log(this.options);

      this.deleteContact(this.options.id);
      this.updateContacts();
      this.$emit('cancel');
    },
  },
};
</script>

<style></style>
