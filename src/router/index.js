import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Contacts from '../views/Contacts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login page',
    component: Login,
  },
  {
    path: '/contacts/:id',
    name: 'Contacts',
    component: Contacts,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
