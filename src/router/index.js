import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import ArticleList from '../views/ArticleList.vue'
import Column from '../views/Column.vue'
import Editor from '../views/Editor'
import User from '../views/User'
import Socket from '../views/Socket'

//mobile views
import MHome from '../mviews/MHome'
import MArticleList from '../mviews/ArticleList'
import MArticle from '../mviews/Article'
import MColumn from '../mviews/Column'
import MUser from '../mviews/User'


const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (local) {
  return originalReplace.call(this, local).catch(err => err)
}

VueRouter.prototype.push = function (local) {
  return originalPush.call(this, local).catch(err => err)
}

Vue.use(VueRouter)




const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: ()=> import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: ArticleList,
        props: (route) => ({
          columnId: route.query.columnId
        })
      },
      {
        path: '/column',
        name: 'column',
        component: Column,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/article/:id',
        name: 'article',
        component: Article
      },
      {
        path: '/socket',
        name: 'socket',
        component: Socket
      },
      {
        path: '/editor',
        name: 'editor',
        component: Editor,
        props: (route) => ({
          columnId: route.query.columnId
        })
      },
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]
  },
  {
    path: '/m',
    name: 'mHome',
    redirect: '/m/articles',
    component: MHome,
    children: [
      {
        path: 'articles',
        name: 'mArticleList',
        component: MArticleList,
        meta: {
          headType: 'SearchBar'
        }
      },
      {
        path: 'article/:id',
        name: 'mArticle',
        component: MArticle,
        // props: true,
        meta: {
          headType: 'NavBar',
          title: '文章',
          button: '评论',
          buttonHandler: 'show-comment-action'
        }
      },
      {
        path: 'column',
        name: 'mColumn',
        component: MColumn,
        meta: {
          headType: 'NavBar',
          title: '分类'
        }
      },
      {
        path: 'user',
        name: 'mUser',
        component: MUser,
        meta: {
          headType: 'NavBar',
          title: '我的'
        },
        props: (route) => ({
          state: route.query.state
        })
      }
    ]
  }

]
const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  let useAuth = to.meta.requiresAuth
  if (useAuth && !store.state.token) {
    Vue.prototype.$notify.warning({
      title: '通知',
      message: `请先登录`
    })
    NProgress.done()
    next('/index')
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})


export default router
