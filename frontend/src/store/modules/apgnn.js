import {
  apgnnTrain,
  apgnnTest,
  apgnnInitTrain,
  apgnnInitTest
} from '@/api/apgnn'

const getDefaultState = () => {
  return {
    apgnn_training_data: '',
    apgnn_test_data: ''
  }
}
const state = getDefaultState()

const mutations = {
  SET_apgnn_trainging_data: (state, apgnn_training_data) => {
    state.apgnn_training_data = apgnn_training_data
  },
  SET_apgnn_test_data: (state, apgnn_test_data) => {
    state.apgnn_test_data = apgnn_test_data
  }
}

const actions = {
  apgnnTrain({ commit }) {
    return new Promise(resolve => {
      console.log('开始训练')
      // console.log(data_form)
      // const { dataset, data_type } = data_form
      // const payload = {
      //   'dataset': dataset,
      //   'data_type': data_type
      // }
      apgnnTrain().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const apgnn_training_data = data
        commit('SET_apgnn_trainging_data', apgnn_training_data)
        resolve(data)
      })
    })
  },
  apgnnInitTrain({ commit }) {
    return new Promise(resolve => {
      apgnnInitTrain().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const apgnn_training_data = data
        commit('SET_apgnn_trainging_data', apgnn_training_data)
        resolve(data)
      })
    })
  },
  apgnnTest({ commit }) {
    return new Promise(resolve => {
      console.log('开始测试')
      apgnnTest().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const apgnn_test_data = data
        commit('SET_apgnn_test_data', apgnn_test_data)
        resolve(data)
      })
    })
  },
  apgnnInitTest({ commit }) {
    return new Promise(resolve => {
      console.log('开始测试')
      apgnnInitTest().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const apgnn_test_data = data
        commit('SET_apgnn_test_data', apgnn_test_data)
        resolve(data)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
