import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1c35f0ee = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _59c08cfe = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _42ed49ac = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _3ac6092a = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _a189a67c = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _33d3a468 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _21904c77 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _1c35f0ee,
    children: [{
      path: "/",
      component: _59c08cfe,
      name: "home"
    }, {
      path: "/login",
      component: _42ed49ac,
      name: "login"
    }, {
      path: "/register",
      component: _42ed49ac,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _3ac6092a,
      name: "profile"
    }, {
      path: "/settings/",
      component: _a189a67c,
      name: "settings"
    }, {
      path: "/editor/",
      component: _33d3a468,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _21904c77,
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
