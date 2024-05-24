import {
  processData,
  dataDistribution
} from '@/api/uploadData'

const getDefaultState = () => {
  return {
    processed_data: '',
    data_distribution: ''
  }
}
const state = getDefaultState()

const mutations = {
  SET_processed_DATA: (state, processed_data) => {
    state.processed_data = processed_data
  },
  SET_data_distribution: (state, data_distribution) => {
    state.data_distribution = data_distribution
  }
}

const actions = {
  processData({ commit }, data_form) {
    return new Promise(resolve => {
      console.log('开始构建数据集')
      console.log(data_form)
      const { dataset, data_type } = data_form
      const payload = {
        'dataset': dataset,
        'data_type': data_type
      }
      processData(payload).then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const processed_data = data
        commit('SET_processed_DATA', processed_data)
        resolve(data)
      })
    })
  },
  dataDistribution({ commit }) {
    return new Promise(resolve => {
      console.log('开始构建数据集')
      dataDistribution().then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const data_distribution = data
        commit('SET_data_distribution', data_distribution)
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
