import {
  abnormalModelInit, abnormalModelShow,
  abnormalRecreateTable
} from '@/api/abnormalTrans'

const getDefaultState = () => {
  return {
    abnormal_recreate_data: '', // 删库
    abnormal_model_data: ''// 模型
  }
}

const state = getDefaultState()

const mutations = {
  SET_abnormal_RECREATE: (state, abnormal_recreate_data) => {
    state.abnormal_recreate_data = abnormal_recreate_data
  },
  SET_abnormal_MODEL: (state, abnormal_model_data) => {
    state.abnormal_model_data = abnormal_model_data
  }
}

const actions = {
  // 删除历史数据并重新建表
  abnormalRecreateTable({ commit }, is_delete) {
    return new Promise(resolve => {
      console.log('删除历史数据开始')
      const payload = { 'is_recreate': is_delete }
      abnormalRecreateTable(payload).then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const abnormal_recreate_data = data
        commit('SET_abnormal_RECREATE', abnormal_recreate_data)
        resolve(data)
      })
    })
  },
  abnormalModelShow({ commit }, T) { // 异常转账
    // const { lrNum, batch, num} = form
    return new Promise((resolve, reject) => {
      console.log('表单信息', T)
      console.log('异常转账模型开始')
      const payload = { 'T': T }
      abnormalModelShow(payload).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const abnormal_model_data = data
        commit('SET_abnormal_MODEL', abnormal_model_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  abnormalModelInit({ commit }) { // 异常转账
    return new Promise((resolve, reject) => {
      console.log('异常转账模型初始化')
      abnormalModelInit().then(response => {
        const { data } = response
        console.log('返回结果：', data)
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const abnormal_model_data = data
        commit('SET_abnormal_MODEL', abnormal_model_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
