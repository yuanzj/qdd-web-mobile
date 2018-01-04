import Vue from 'vue'
import Router from 'vue-router'
import InsuranceList from '@/pages/InsuranceList'
import InsuranceDetail from '@/pages/InsuranceDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InsuranceList',
      component: InsuranceList
    },
    {
      path: '/p-detail',
      name: 'InsuranceDetail',
      component: InsuranceDetail
    }
  ]
})
