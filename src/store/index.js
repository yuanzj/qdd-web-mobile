
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义数据源
const state = {

  currentIns: {},
  qddUserId: '',
  selectedOrderStatus: '0',
  orderList: [],
  currentOrderIndex: 0

}

// 定义方法
const mutations = {
  setCurrentIns (state, ll) {
    state.currentIns = ll
    console.log(state.currentIns)
  },
  setQddUserId (state, ll) {
    state.qddUserId = ll
    console.log(state.qddUserId)
  },
  setSelectedOrderStatus (state, ll) {
    state.selectedOrderStatus = ll
    console.log(state.selectedOrderStatus)
  },
  setOrderList (state, ll) {
    state.orderList = ll
    console.log(state.orderList)
  },
  setCurrentOrderIndex (state, ll) {
    state.currentOrderIndex = ll
    console.log(state.currentOrderIndex)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
