import Vue from 'vue'
import Vuex from 'Vuex'
import * as actios from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutatios'
//插件查看vuex
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

//调试模式
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actios,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})