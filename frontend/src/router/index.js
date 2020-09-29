import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import EditProfile from '../views/EditProfile.vue';
import Community from '../views/Community.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/Community',
    name: 'Community',
    component: Community,
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/EditProfile',
    name: 'EditProfile',
    component: EditProfile,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
