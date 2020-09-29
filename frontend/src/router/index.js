import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeLayout from '../layouts/HomeLayout.vue';
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
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/community',
        name: 'Community',
        component: Community,
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
      },
      {
        path: '/edit-profile',
        name: 'EditProfile',
        component: EditProfile,
      },

    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
