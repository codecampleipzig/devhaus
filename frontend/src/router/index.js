import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeLayout from '../layouts/HomeLayout.vue';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import EditProfile from '../views/EditProfile.vue';
import Community from '../views/Community.vue';
import Profile from '../views/Profile.vue';
import Register from '../views/Register.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth/:mode',
    name: 'Auth',
    component: Auth,
    meta: { requiresAuth: false, requiresProfile: false },
  },
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true, requiresProfile: true },
      },
      {
        path: '/community',
        name: 'Community',
        component: Community,
        meta: { requiresAuth: true, requiresProfile: true },
      },
      {
        path: '/profile/:userId',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true, requiresProfile: true },
      },
      {
        path: '/edit-profile',
        name: 'EditProfile',
        component: EditProfile,
        meta: { requiresAuth: true, requiresProfile: true },
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresAuth: true, requiresProfile: false },
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
  } else if
  (to.meta.requiresProfile
    && !store.state.profiles.some((profile) => profile.userId == store.state.user.uid)) {
    next({ name: 'Register' });
  } else if (to.name == 'Register'
    && store.state.profiles.some((profile) => profile.userId == store.state.user.uid)) {
    next({ name: 'Home' });
  } else { next(); }
});

export default router;
