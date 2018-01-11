
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义数据源
const state = {

  currentIns: {},
  qddUserId: ''

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
  }
}

export default new Vuex.Store({
  state,
  mutations
})
