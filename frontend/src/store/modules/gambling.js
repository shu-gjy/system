import {
  gambleModelInit, gambleModelShow,
  gamblingRecreateTable,
  gambleTestShow, gambleTestInit
} from '@/api/gambling'

const getDefaultState = () => {
  return {
    gambling_recreate_data: '', // 删库
    gambleModel_data: '',
    gambleTest_data: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_gambling_RECREATE: (state, gambling_recreate_data) => {
    state.gambling_recreate_data = gambling_recreate_data
  },
  SET_GAMBLEMODEL: (state, gambleModel_data) => {
    state.gambleModel_data = gambleModel_data
  },
  SET_GAMBLETEST: (state, gambleTest_data) => {
    state.gambleTest_data = gambleTest_data
  }
}

const actions = {
  // 删除历史数据并重新建表
  gamblingRecreateTable({ commit }, is_delete) {
    return new Promise(resolve => {
      console.log('删除历史数据开始')
      const payload = { 'is_recreate': is_delete }
      gamblingRecreateTable(payload).then(response => {
        const { data } = response// 后端返回的数据用data保存
        if (!data) {
          return false
        }
        const gambling_recreate_data = data
        commit('SET_gambling_RECREATE', gambling_recreate_data)
        resolve(data)
      })
    })
  },
  gambleModelShow({ commit }, form) { // 赌博
    const { lrNum, num } = form
    return new Promise((resolve, reject) => {
      console.log('表单信息', form)
      console.log('赌博模型开始')
      const payload = {
        'lr': lrNum,
        'num_epochs': num
      }
      gambleModelShow(payload).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const gambleModel_data = data
        commit('SET_GAMBLEMODEL', gambleModel_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  gambleModelInit({ commit }) { // 赌博
    return new Promise((resolve, reject) => {
      console.log('赌博模型初始化')
      gambleModelInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const gambleModel_data = data
        commit('SET_GAMBLEMODEL', gambleModel_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  gambleTestShow({ commit }) { // 伪冒注册
    return new Promise((resolve, reject) => {
      console.log('赌博模型测试开始')
      gambleTestShow().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const gambleTest_data = data
        commit('SET_GAMBLETEST', gambleTest_data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  gambleTestInit({ commit }) { // 伪冒注册
    return new Promise((resolve, reject) => {
      console.log('赌博模型测试初始化')
      gambleTestInit().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const gambleTest_data = data
        commit('SET_GAMBLETEST', gambleTest_data)
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
