import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/TestPage.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/ResultPage.vue'),
    beforeEnter: (to, from, next) => {
      // type 쿼리스트링 없으면 홈으로 리다이렉트
      if (!to.query.type) {
        next('/')
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router