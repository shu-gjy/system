import {
  tahiaTrain,
  tahiaTest,
  tahiaInitTrain,
  tahiaInitTest
} from '@/api/tahia'

const getDefaultState = () => {
  return {
    tahia_training_data: '',
    tahia_test_data: ''
  }
}
const state = getDefaultState()

const mutations = {
  SET_tahia_trainging_data: (state, tahia_training_data) => {
    state.tahia_training_data = tahia_training_data
  },
  SET_tahia_test_data: (state, tahia_test_data) => {
    state.tahia_test_data = tahia_test_data
  }
}

const actions = {
  tahiaTrain({ commit }) {
    return new Promise(resolve => {
      console.log('开始训练')
      // console.log(data_form)
      // const { dataset, data_type } = data_form
      // const payload = {
      //   'dataset': dataset,
      //   'data_type': data_type
      // }
      tahiaTrain().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const tahia_training_data = data
        commit('SET_tahia_trainging_data', tahia_training_data)
        resolve(data)
      })
    })
  },
  tahiaInitTrain({ commit }) {
    return new Promise(resolve => {
      tahiaInitTrain().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const tahia_training_data = data
        commit('SET_tahia_trainging_data', tahia_training_data)
        resolve(data)
      })
    })
  },
  tahiaTest({ commit }) {
    return new Promise(resolve => {
      console.log('开始测试')
      tahiaTest().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const tahia_test_data = data
        commit('SET_tahia_test_data', tahia_test_data)
        resolve(data)
      })
    })
  },
  tahiaInitTest({ commit }) {
    return new Promise(resolve => {
      console.log('开始测试')
      tahiaInitTest().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const tahia_test_data = data
        commit('SET_tahia_test_data', tahia_test_data)
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
