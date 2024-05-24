import {
  storeModelInit, storeModelShow,
  storeFraudRecreateTable,
  storeTestShow, storeTestInit, storeUploadTrainData

} from '@/api/storeFraud'

const getDefaultState = () => {
  return {
    storeFraud_recreate_data: '', // 删库
    storeModel_data: '',
    storeTest_data: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_storeFraud_RECREATE: (state, storeFraud_recreate_data) => {
    state.storeFraud_recreate_data = storeFraud_recreate_data
  },
  SET_STOREMODEL: (state, storeModel_data) => {
    state.storeModel_data = storeModel_data
  },
  SET_STORETEST: (state, storeTest_data) => {
    state.storeTest_data = storeTest_data
  }
}

const actions = {
  // 删除历史数据并重新建表
  storeFraudRecreateTable({ commit }, is_delete) {
    return new Promise(resolve => {
      console.log('删除历史数据开始')
      const payload = { 'is_recreate': is_delete }
      storeFraudRecreateTable(payload).then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const storeFraud_recreate_data = data
        commit('SET_storeFraud_RECREATE', storeFraud_recreate_data)
        resolve(data)
      })
    })
  },
  storeModelShow({ commit }, form) { // 商户违规
    const { lrNum, weight, num } = form
    return new Promise((resolve, reject) => {
      console.log('表单信息', form)
      console.log('商户违规模型开始')
      const payload = {
        'lr': lrNum,
        'weight_decay': weight,
        'num_epochs': num
      }
      storeModelShow(payload).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const storeModel_data = data
        commit('SET_STOREMODEL', storeModel_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  storeModelInit({ commit }) { // 商户违规
    return new Promise((resolve, reject) => {
      console.log('商户违规模型初始化')
      storeModelInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const storeModel_data = data
        commit('SET_STOREMODEL', storeModel_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  storeTestShow({ commit }) { // 伪冒注册
    // const { lrNum, weight, batch, num, valid } = form
    return new Promise((resolve, reject) => {
      // console.log('表单信息', form)
      console.log('商户违规模型测试开始')
      storeTestShow().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const storeTest_data = data
        commit('SET_STORETEST', storeTest_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  storeTestInit({ commit }) { // 伪冒注册
    return new Promise((resolve, reject) => {
      console.log('商户违规模型测试初始化')
      storeTestInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const storeTest_data = data
        commit('SET_STORETEST', storeTest_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  storeUploadTrainData({ commit }) {
    return new Promise((resolve, reject) => {
      console.log('商户上传数据')
      storeUploadTrainData().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const storeTest_data = data
        commit('SET_STORETEST', storeTest_data)
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
