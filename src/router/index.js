import Vue from 'vue'
import Router from 'vue-router'

// 产品列表
import InsuranceList from '@/pages/InsuranceList'
// 产品详情
import InsuranceDetail from '@/pages/InsuranceDetail'
// 我的保单
import MyInsurance from '@/pages/MyInsurance'
// 我的保单详情
import MyInsuranceDetail from '@/pages/MyInsuranceDetail'

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
    },
    {
      path: '/my-insurance',
      name: 'MyInsurance',
      component: MyInsurance
    },
    {
      path: '/my-insurance-detail',
      name: 'MyInsuranceDetail',
      component: MyInsuranceDetail
    }

  ]
})
