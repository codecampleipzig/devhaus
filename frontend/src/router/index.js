import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeLayout from '../layouts/HomeLayout.vue';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import EditProfile from '../views/EditProfile.vue';
import Members from '../views/Members.vue';
import Profile from '../views/Profile.vue';
import Register from '../views/Register.vue';
import store from '../store';
import NotFound from '../views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth/:mode',
    name: 'Auth',
    component: Auth,
    meta: { requiresAuth: false, requiresProfile: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: true, requiresProfile: false },
  },
  { path: '*', component: NotFound },

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
        path: '/members',
        name: 'Members',
        component: Members,
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
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  // routes: [
  //   { path: '*', component: NotFound }],
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == 'Auth' && store.state.user) {
    return next({ name: 'Home' });
  }
  if (to.meta.requiresAuth && store.state.user == null) {
    return next({ name: 'Auth', params: { mode: 'signin' } });
  } if
  (to.meta.requiresProfile
    && store.state.profiles.some((profile) => profile.userId == store.state.user.uid)
    == false) {
    return next({ name: 'Register' });
  }
  if (to.name == 'Register'
  && store.state.profiles.some((profile) => profile.userId == store.state.user.uid)
  == true) {
    return next({ name: 'Home' });
  }
  return next();
});

export default router;
