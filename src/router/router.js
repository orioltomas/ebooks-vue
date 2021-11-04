import { createWebHistory, createRouter } from 'vue-router'
import Home from './../views/Home.vue'
import Ebooks from './../views/Ebooks.vue'
import { stringToHash } from './../helpers'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ebooks',
    name: 'ebooks',
    component: Ebooks
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const password = window.localStorage.getItem('password') ?? '';
  const hashedPassword = stringToHash(process.env.VUE_APP_SECRET);
  const authenticated = password === hashedPassword.toString();
  
  if (to.name !== 'home' && !authenticated) {
    next({ name: 'home' });
  }
  
  if (to.name === 'home' && authenticated) {
    next({ name: 'ebooks' });
  }

  next();
})

export default router;
