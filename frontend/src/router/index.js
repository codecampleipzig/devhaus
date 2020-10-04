import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeLayout from '../layouts/HomeLayout.vue';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import EditProfile from '../views/EditProfile.vue';
import Members from '../views/Members.vue';
import Profile from '../views/Profile.vue';
import Register from '../views/Register.vue';
import Calendar from '../views/Calendar.vue';
import Event from '../views/Event.vue';
import CreateEvent from '../views/CreateEvent.vue';
import store from '../store';
import NotFound from '../views/404.vue';
import { firebaseAuthConnected } from '../main';

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
        path: '/calendar',
        name: 'Calendar',
        component: Calendar,
        meta: { requiresAuth: true, requiresProfile: true },
      },
      {
        path: '/event/:id',
        name: 'Event',
        component: Event,
        meta: { requiresAuth: true, requiresProfile: true },
      },
      {
        path: '/create-event',
        name: 'CreateEvent',
        component: CreateEvent,
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
      { path: '*', component: NotFound, meta: { requiresAuth: true, requiresProfile: true } },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  await firebaseAuthConnected;
  if (to.meta.requiresAuth) {
    // is the user logged in?
    if (store.state.user) {
      // is the user logged in and needs a profile to continue?
      // If we can't find the profile let's bind them now
      if (!store.state.profiles.some((profile) => profile.userId == store.state.user.uid)) {
        await store.dispatch('bindProfiles');
      }
      if (to.meta.requiresProfile) {
        // check that the logged-in user has a profile
        if (store.state.profiles.some((profile) => profile.userId == store.state.user.uid)) {
          return next();
        }
        // if not, redirect user to the register page to create a profile
        return next({ name: 'Register' });
      }
      // profile was not required to move forward
      // TODO: if profile exists, move forward to home
      console.assert(to.name == 'Register');
      if (store.state.profiles.some((profile) => profile.userId == store.state.user.uid)) {
        return next({ name: 'Home' });
      }
      return next();
    }
    // user is trying to navigate to a page that requires authentication
    return next({
      name: 'Auth',
      params: {
        mode: 'signin',
      },
    });
  }
  return next();
});

export default router;
