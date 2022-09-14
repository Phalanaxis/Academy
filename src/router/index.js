import { createRouter, createWebHistory } from 'vue-router'
import { useProfileStore } from '@/stores/profile'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: {
        name: 'home'
      },
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/index.vue'),
          meta: {
            requiresAuth: true,
            title: ''
          }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/profile.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Профиль'
          }
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: '/404',
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('../views/cart.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Корзина'
          }
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('../views/products/index.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Продукты'
          }
        },
        {
          path: '/products/:id',
          name: 'product',
          component: () => import('../views/products/_id.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Продукт'
          }
        },
        {
          path: '/webinars',
          name: 'webinars', 
          component: () => import('../views/webinars/index.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Вебинары'
          }
        },
        {
          path: '/webinars/:id',
          name: 'webinar',
          component: () => import('../views/webinars/_id.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Вебинар'
          }
        },
        {
          path: '/events',
          name: 'events',
          component: () => import('../views/events/index.vue'),
          meta: {
            requiresAuth: true,
            title: ' - События'
          }
        },
        {
          path: '/events/:id',
          name: 'event',
          component: () => import('../views/events/_id.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Событие'
          }
        },
        {
          path: '/articles',
          name: 'articles',
          component: () => import('../views/articles/index.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Статьи'
          }
        },
        {
          path: '/articles/:id',
          name: 'article',
          component: () => import('../views/articles/_id.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Статья'
          }
        },
        {
          path: '/courses/',
          name: 'courses',
          component: () => import('../views/courses/index.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Ваши Курсы'
          }
        },
        {
          path: '/courses/webinar/:id',
          name: 'ownedWebinar',
          component: () => import('../views/courses/webinar.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Ваш вебинар'
          }
        },
        {
          path: '/courses/:id',
          name: 'ownedCourse',
          component: () => import('../views/courses/course.vue'),
          meta: {
            requiresAuth: true,
            title: ' - Ваш курс'
          }
        }

      ]
    },
    {
      path: '/',
      name: 'modal',
      redirect: {
        name: 'authentification',
      },
      component: () => import('../layouts/modal.vue'),
      children: [
        {
          path: '/authentification',
          name: 'authentification',
          component: () => import('../views/auth/authentification.vue'),
          meta: {
            redirectWhenLogged: true,
            title: ' - Вход'
          }
        },
        {
          path: '/registration',
          name: 'registration',
          component: () => import('../views/auth/registration.vue'),
          meta: {
            redirectWhenLogged: true,
            title: ' - Регистрация'
          }
        },
        {
          path: '/restoration',
          name: 'restoration',
          component: () => import('../views/auth/restoration.vue'),
          meta: {
            redirectWhenLogged: true,
            title: ' - Восстановление'
          }
        },
        {
          path: '/passwordChange',
          name: 'passwordChange',
          component: () => import('../views/auth/passwordChange.vue'),
          meta: {
            redirectWhenLogged: true,
            title: ' - Изменение Пароля'
          }
        },
        {
          path: '/passwordChangeSuccess',
          name: 'passwordChangeSuccess',
          component: () => import('../views/auth/passwordChangeSuccess.vue'),
          meta: {
            redirectWhenLogged: true,
            title: ' - Изменение Пароля'
          }
        },
        {
          path: '/auth/google',
          name: 'google',
          component: () => import('../views/auth/google.vue'),
          meta: {
            redirectWhenLogged: true,
            title: ' - Войти используя учетную запись Google'
          }
        },
        {
          path: 'auth/vkontakte',
          name: 'vkontakte',
          component: () => import('../views/auth/vkontakte.vue'),
          meta: {
            redirectWhenLogged: true,
            title: ' - Войти используя учетную запись Vkontakte'
          }
        }
      ]
    }
  ]
})

const DEFAULT_TITLE = 'Академия Материнства';

router.beforeEach((to, from, next) => {
  const profile = useProfileStore()
  var sessionType = 'session'

  if (localStorage.getItem('sessionType')) {
    sessionType = localStorage.getItem('sessionType')
  }
  
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (eval(sessionType + `Storage.getItem('token') && !profile.token`)) {
      profile.token = eval(sessionType + `Storage.getItem('token')`)
      profile.fetchUserData()
    }
    if (eval(sessionType + `Storage.getItem('token') && profile.token`)) {
      next()
      return
    }
    next({ name: 'authentification' })
  } 
  else if(to.matched.some(record => record.meta.redirectWhenLogged) && eval(sessionType + `Storage.getItem('token')`)) {
    if (eval(sessionType + `Storage.getItem('token')`) && !profile.token) {
      profile.token = eval(sessionType + `Storage.getItem('token')`)
      profile.fetchUserData()
    }
    next({ name: 'home' })
  }
  else {
    next()
  }
})

router.beforeResolve(async (to, from, next) => {
  const profile = useProfileStore()
  if (to.path === '/courses/webinar/' + to.params.id){
    if (profile.courses === null) {
      next({ name: 'home' })
    } else if (profile.courses !== null && !profile.webinars.find(item => item.id === Number(atob(to.params.id.slice(to.params.id.lastIndexOf('-') + 1, to.params.id.length))))) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else if (to.path === '/courses/' + to.params.id) {
    if (profile.courses === null) {
      next({ name: 'home' })
    } else if (profile.courses !== null && !profile.courses.find(item => item.id === Number(atob(to.params.id.slice(to.params.id.lastIndexOf('-') + 1, to.params.id.length))))) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = DEFAULT_TITLE +  to.meta.title || DEFAULT_TITLE;
});

export default router
