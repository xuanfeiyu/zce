import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _771019f5 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _25254a6a = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _7fbc4b3e = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _5afd443e = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _d42957a4 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _6b414038 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _41c7878b = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _771019f5,
    children: [{
      path: "/",
      component: _25254a6a,
      name: "home"
    }, {
      path: "/login",
      component: _7fbc4b3e,
      name: "login"
    }, {
      path: "/register",
      component: _7fbc4b3e,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _5afd443e,
      name: "profile"
    }, {
      path: "/settings/",
      component: _d42957a4,
      name: "settings"
    }, {
      path: "/editor/",
      component: _6b414038,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _41c7878b,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
