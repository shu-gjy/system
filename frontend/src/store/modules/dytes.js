import {
  dytesTrain,
  dytesTest,
  dytesInitTrain1,
  dytesInitTrain2,
  dytesInitTest1,
  dytesInitTest2,
} from '@/api/dytes'

const getDefaultState = () => {
  return {
    dytes_training_data1: '',
    dytes_test_data1: '',
    dytes_training_data2: '',
    dytes_test_data2: ''
  }
}
const state = getDefaultState()

const mutations = {
  SET_dytes_trainging_data1: (state, dytes_training_data1) => {
    state.dytes_training_data1 = dytes_training_data1
  },
  SET_dytes_test_data1: (state, dytes_test_data1) => {
    state.dytes_test_data1 = dytes_test_data1
  },
  SET_dytes_trainging_data2: (state, dytes_training_data2) => {
    state.dytes_training_data2 = dytes_training_data2
  },
  SET_dytes_test_data2: (state, dytes_test_data2) => {
    state.dytes_test_data2 = dytes_test_data2
  }
}

const actions = {
  dytesTrain({ commit }, data_form) {
    return new Promise(resolve => {
      console.log('开始训练')
      const { dataset } = data_form
      const payload = {
        'dataset': dataset
      }
      // console.log(data_form)
      // const { dataset, data_type } = data_form
      // const payload = {
      //   'dataset': dataset,
      //   'data_type': data_type
      // }
      dytesTrain(payload).then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        if (dataset === 'xinyongka'){
          const dytes_training_data1 = data
          commit('SET_dytes_trainging_data1', dytes_training_data1)
        } else {
          const dytes_training_data2 = data
          commit('SET_dytes_trainging_data2', dytes_training_data2)
        }

        resolve(data)
      })
    })
  },
  dytesInitTrain1({ commit }) {
    return new Promise(resolve => {

      dytesInitTrain1().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const dytes_training_data1 = data
        commit('SET_dytes_trainging_data1', dytes_training_data1)
        resolve(data)
      })
    })
  },
  dytesInitTrain2({ commit }) {
    return new Promise(resolve => {

      dytesInitTrain2().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const dytes_training_data2 = data
        commit('SET_dytes_trainging_data2', dytes_training_data2)
        resolve(data)
      })
    })
  },
  dytesTest({ commit }, data_form) {
    return new Promise(resolve => {
      console.log('开始测试')
      const { dataset } = data_form
      const payload = {
        'dataset': dataset
      }
      console.log(payload)
      dytesTest(payload).then(response => {
        console.log(response)
        const { data } = response// 后端返回的数据用data保存

        if (!data) {
          return false
        }
        if (dataset === 'xinyongka'){
          const dytes_test_data1 = data
          commit('SET_dytes_test_data1', dytes_test_data1)
        } else {
          const dytes_test_data2 = data
          commit('SET_dytes_test_data2', dytes_test_data2)
        }
        resolve(data)
      })
    })
  },
  dytesInitTest1({ commit }) {
    return new Promise(resolve => {
      console.log('开始测试')
      dytesInitTest1().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const dytes_test_data1 = data
        commit('SET_dytes_test_data1', dytes_test_data1)
        resolve(data)
      })
    })
  },
  dytesInitTest2({ commit }) {
    return new Promise(resolve => {
      console.log('开始测试')
      dytesInitTest2().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const dytes_test_data2 = data
        commit('SET_dytes_test_data2', dytes_test_data2)
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
