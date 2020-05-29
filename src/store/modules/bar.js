// store/modules/foo.js
const fetchBar = function() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('组件返回的数据')
        }, 1000)
    })
}
export default {
    namespaced: true,

    // 重要信息：state 必须是一个函数，
    // 因此可以创建多个实例化该模块
    state: () => ({
      count: 0,

      name: ''
    }),

    actions: {
        inc: ({ commit }) => commit('inc'),

        fetchBar({ commit }){
            return fetchBar().then((res) => {
                commit('SET_BAR', res)
            })
        }
    },

    mutations: {
        inc: state => {
            state.count++
        },

        SET_BAR(state, payload){
            state.name = payload
        }
    }
  }