import {
  marketModelInit, marketModelShow,
  marketingRecreateTable,
  marketTestShow, marketTestInit
} from '@/api/marketing'

const getDefaultState = () => {
  return {
    marketing_recreate_data: '', // 删库
    marketModel_data: '',
    marketTest_data: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_marketing_RECREATE: (state, marketing_recreate_data) => {
    state.marketing_recreate_data = marketing_recreate_data
  },
  SET_MARKETMODEL: (state, marketModel_data) => {
    state.marketModel_data = marketModel_data
  },
  SET_MARKETTEST: (state, marketTest_data) => {
    state.marketTest_data = marketTest_data
  }
}

const actions = {
  // 删除历史数据并重新建表
  marketingRecreateTable({ commit }, is_delete) {
    return new Promise(resolve => {
      console.log('删除历史数据开始')
      const payload = { 'is_recreate': is_delete }
      marketingRecreateTable(payload).then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const marketing_recreate_data = data
        commit('SET_marketing_RECREATE', marketing_recreate_data)
        resolve(data)
      })
    })
  },
  marketModelShow({ commit }, form) { // 黄牛营销
    const { lrNum, batch, num } = form
    return new Promise((resolve, reject) => {
      console.log('表单信息', form)
      console.log('黄牛营销模型开始')
      const payload = {
        'lr': lrNum,
        'total_epoch': num,
        'batch_size': batch
      }
      marketModelShow(payload).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const marketModel_data = data
        commit('SET_MARKETMODEL', marketModel_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  marketModelInit({ commit }) { // 黄牛营销
    return new Promise((resolve, reject) => {
      console.log('黄牛营销模型初始化')
      marketModelInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const marketModel_data = data
        commit('SET_MARKETMODEL', marketModel_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  marketTestShow({ commit }) { // 黄牛营销
    return new Promise((resolve, reject) => {
      console.log('黄牛营销模型测试开始')
      marketTestShow().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const marketTest_data = data
        commit('SET_MARKETTEST', marketTest_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  marketTestInit({ commit }) { // 黄牛营销
    return new Promise((resolve, reject) => {
      console.log('黄牛营销模型测试初始化')
      marketTestInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const marketTest_data = data
        commit('SET_MARKETTEST', marketTest_data)
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
