import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history', // 一定是history模式
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home,
                meta: {
                    title: '这是我的首页'
                }
            },
            {
                path: '/about',
                name: 'about',
                component: () => import(/* webpackChunkName: 'about'*/ '@/views/About')
            }
        ]
    })
}