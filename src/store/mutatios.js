import * as types from './mutatios-type'

const matutaios = {
    [types.SET_SINGER](state,singer) {
        state.singer = singer
    }
}
export default  matutaios