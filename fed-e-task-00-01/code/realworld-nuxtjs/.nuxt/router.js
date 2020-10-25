import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _935f3db0 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _abb87b46 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _cae65caa = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _03c5e36b = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _06369aa1 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _aafcf12a = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _2adfb290 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _935f3db0,
    children: [{
      path: "",
      component: _abb87b46,
      name: "home"
    }, {
      path: "/login",
      component: _cae65caa,
      name: "login"
    }, {
      path: "/register",
      component: _cae65caa,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _03c5e36b,
      name: "profile"
    }, {
      path: "/settings",
      component: _06369aa1,
      name: "settings"
    }, {
      path: "/editor",
      component: _aafcf12a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _2adfb290,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
