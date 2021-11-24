import { createWebHistory, createRouter } from 'vue-router'
import Home from './../views/Home.vue'
import Ebooks from './../views/Ebooks.vue'
import HashPassword from './../views/HashPassword.vue'

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
  },
  {
    path: '/hash-password',
    name: 'hashPassword',
    component: HashPassword
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const password = window.localStorage.getItem('password') ?? '';
  const authenticated = password === process.env.VUE_APP_SECRET;
  
  if (to.name !== 'home' && !authenticated) {
    next({ name: 'home' });
  }

  if (to.name === 'home' && authenticated) {
    next({ name: 'ebooks' });
  }

  next();
})

export default router;
