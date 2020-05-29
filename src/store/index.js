import Vue from 'vue'
import Vuex from 'vuex'
// import bar from './modules/bar'

Vue.use(Vuex)

export function createStore() {
    const store =  new Vuex.Store({
        state: {
            name: ''
        },

        mutations: {
            SET_BAR(state, payload) {
                state.name = payload
            }
        },

        actions: {
        },

        // modules: {
        //     bar
        // }
    })
    return store
}