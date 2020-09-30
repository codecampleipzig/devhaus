import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeLayout from '../layouts/HomeLayout.vue';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import EditProfile from '../views/EditProfile.vue';
import Community from '../views/Community.vue';
import Profile from '../views/Profile.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth/:mode',
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
        meta: { requiresAuth: true },
      },
      {
        path: '/community',
        name: 'Community',
        component: Community,
        meta: { requiresAuth: true },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true },
      },
      {
        path: '/edit-profile',
        name: 'EditProfile',
        component: EditProfile,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && store.state.user == null) {
    next({ name: 'Auth', params: { mode: 'signin' } });
  } else {
    next();
  }
});

export default router;
