import {
  creditModelInit, creditModelShow,
  creditRecreateTable,
  creditTestShow, creditTestInit
} from '@/api/creditCardCash'

const getDefaultState = () => {
  return {
    credit_recreate_data: '', // 删库
    creditModel_date: '',
    creditTest_data: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_credit_RECREATE: (state, credit_recreate_data) => {
    state.credit_recreate_data = credit_recreate_data
  },
  SET_CREDITMODEL: (state, creditModel_date) => {
    state.creditModel_date = creditModel_date
  },
  SET_CREDITTEST: (state, creditTest_data) => {
    state.creditTest_data = creditTest_data
  }
}

const actions = {
  // 删除历史数据并重新建表
  creditRecreateTable({ commit }, is_delete) {
    return new Promise(resolve => {
      console.log('删除历史数据开始')
      const payload = { 'is_recreate': is_delete }
      creditRecreateTable(payload).then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const credit_recreate_data = data
        commit('SET_credit_RECREATE', credit_recreate_data)
        resolve(data)
      })
    })
  },

  creditModelShow({ commit }, form) { // 信用卡违规套现
    const { lrNum, weight, batch, num, valid } = form
    return new Promise((resolve, reject) => {
      console.log('表单信息', form)
      console.log('信用卡违规套现模型开始')
      const payload = {
        'lr': lrNum,
        'weight_decay': weight,
        'batch_size': batch,
        'num_epochs': num,
        'valid_epochs': valid
      }
      creditModelShow(payload).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const creditModel_date = data
        commit('SET_CREDITMODEL', creditModel_date)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  creditModelInit({ commit }) { // 信用卡违规套现
    return new Promise((resolve, reject) => {
      console.log('信用卡违规套现模型初始化')
      creditModelInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const creditModel_date = data
        commit('SET_CREDITMODEL', creditModel_date)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  creditTestShow({ commit }) { // 伪冒注册
    return new Promise((resolve, reject) => {
      console.log('信用卡违规套现模型测试开始')
      creditTestShow().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const creditTest_data = data
        commit('SET_CREDITTEST', creditTest_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  creditTestInit({ commit }) { // 伪冒注册
    return new Promise((resolve, reject) => {
      console.log('信用卡违规套现模型测试初始化')
      creditTestInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const creditTest_data = data
        commit('SET_CREDITTEST', creditTest_data)
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
