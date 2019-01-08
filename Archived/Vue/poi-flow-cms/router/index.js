import Vue from 'vue'
import Router from 'vue-router'
import Muilt from '../layout/Muilt'
import Home from '../page/Home'
import Tag from '../page/Tag'
import AchieveTag from '../page/Achieve/Tag'
import Post from '../page/Post/index'
import PostCreate from '../page/Post/Create'
import PostEdit from '../page/Post/Edit'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Muilt,
      children: [
        { path: '', name: 'home', component: Home, meta: {title: '仪表盘', icon: 'pc'} },
        { path: '/tag', name: 'tag', component: Tag, meta: {title: '标签', icon: 'tag'} },
        { path: '/tag/:id', name: 'achieve-tag', component: AchieveTag, meta: { nude: true } },
        { path: '/post', name: 'post', component: Post, meta: {title: '日志', icon: 'star'} },
        { path: '/post/create', name: 'post-create', component: PostCreate, meta: { nude: true } },
        { path: '/post/:id', name: 'post-edit', component: PostEdit, meta: { nude: true } }
      ]
    }
  ]
})

export default router
