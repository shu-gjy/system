import {
  registerModelInit, registerModelShow,
  registerRecreateTable,
  registerTestShow, registerTestInit
} from '@/api/register'

const getDefaultState = () => {
  return {
    registerModel_data: '',
    register_recreate_data: '',
    registerTest_data: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_register_RECREATE: (state, register_recreate_data) => {
    state.register_recreate_data = register_recreate_data
  },
  SET_REGISTERMODEL: (state, registerModel_data) => {
    state.registerModel_data = registerModel_data
  },
  SET_REGISTERTEST: (state, registerTest_data) => {
    state.registerTest_data = registerTest_data
  }
}

const actions = {
  registerModelShow({ commit }, form) { // 伪冒注册
    const { lrNum, weight, batch, num, valid } = form
    return new Promise((resolve, reject) => {
      console.log('表单信息', form)
      console.log('伪冒注册模型开始')
      const payload = {
        'lr': lrNum,
        'weight_decay': weight,
        'batch_size': batch,
        'num_epochs': num,
        'valid_epochs': valid
      }
      registerModelShow(payload).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const registerModel_data = data
        commit('SET_REGISTERMODEL', registerModel_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  registerModelInit({ commit }) { // 伪冒注册
    return new Promise((resolve, reject) => {
      console.log('伪冒注册模型初始化')
      registerModelInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const registerModel_data = data
        commit('SET_REGISTERMODEL', registerModel_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  registerTestShow({ commit }) { // 伪冒注册
    return new Promise((resolve, reject) => {
      console.log('伪冒注册模型测试开始')
      registerTestShow().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const registerTest_data = data
        commit('SET_REGISTERTEST', registerTest_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  registerTestInit({ commit }) { // 伪冒注册
    return new Promise((resolve, reject) => {
      console.log('伪冒注册模型测试初始化')
      registerTestInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const registerTest_data = data
        commit('SET_REGISTERTEST', registerTest_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除历史数据并重新建表
  registerRecreateTable({ commit }, is_delete) {
    return new Promise(resolve => {
      console.log('删除历史数据开始')
      const payload = { 'is_recreate': is_delete }
      registerRecreateTable(payload).then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const register_recreate_data = data
        commit('SET_register_RECREATE', register_recreate_data)
        resolve(data)
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
