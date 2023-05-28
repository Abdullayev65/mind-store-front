import MindService from "@/serveice/mind.js";
import localStore from "@/helpers/persistaneStorage";

const state = {
    isLoading: false,
    mindsMap: new Map(),
    err: null,
    isLoggedIn: false
}

const getters = {
    mind__mindsMap: state => {
        return state.mindsMap
    },
    // auth__isLoggedIn: state => {
    //     return Boolean(state.isLoggedIn)
    // },
    // auth__isAnonymous: state => {
    //     return state.isLoggedIn === false
    // },
}

const mutations = {
    getSubMindsByIdStart(state) {
        // state.isLoading = true
        // state.err = null
        // state.isLoggedIn = false
    },
    getSubMindsByIdSuccess(state, subMinds) {
        for (let mind in subMinds) {
            state.mindsMap.set(mind.id, mind)
        }
    },
    getSubMindsByIdFail(state, err) {
        // state.isLoading = false
        // state.err = err
        // state.isLoggedIn = false
    },
    getByIdStart(state) {
        // state.isLoading = true
        // state.err = null
        // state.isLoggedIn = false
    },
    getByIdSuccess(state, mind) {
        state.mindsMap.set(mind.id, mind)
    },
    getByIdFail(state, err) {
        // state.isLoading = false
        // state.err = err
        // state.isLoggedIn = false
    },
    updateByIdStart(state) {
        // state.isLoading = true
        // state.err = null
        // state.isLoggedIn = false
    },
    updateByIdSuccess(state, updatedMind) {
        const mind = state.mindsMap.get(updatedMind.id)
        Object.values((name, field) => {
            mind[name] = field
        })
    },
    updateByIdFail(state, err) {
        alert(err)
    },
}

const actions = {
    getById(ctx, id) {
        return new Promise((resolve, reject) => {
            ctx.commit('getByIdStart')

            MindService.getById(id)
                .then((res) => {
                    if (res.data['status']) {
                        const mind = res.data['res']
                        ctx.commit('getByIdSuccess', mind)
                        resolve(mind)
                    } else {
                        ctx.commit('getByIdFail', res.data['msg'])
                        reject(res.data['msg'])
                    }
                })
                .catch((err) => {
                    ctx.commit('getByIdFail')
                    console.log(`err:`, err)
                })
        })
    },
    getSubMindsById(ctx, id) {
        return new Promise((resolve, reject) => {
            ctx.commit('getSubMindsByIdStart')

            MindService.getSubMindsById(id)
                .then((res) => {
                    if (res.data['status']) {
                        const mind = res.data['res']
                        ctx.commit('getSubMindsByIdSuccess', mind)
                        resolve(mind)
                    } else {
                        ctx.commit('getSubMindsByIdFail', res.data['msg'])
                        reject(res.data['msg'])
                    }
                })
                .catch((err) => {
                    ctx.commit('getSubMindsByIdFail')
                    console.log(`err:`, err)
                })
        })
    },
    updateById(ctx, mind) {
        return new Promise((resolve, reject) => {
            ctx.commit('updateByIdStart')

            MindService.updateById(mind)
                .then((res) => {
                    if (res.data['status']) {
                        ctx.commit('updateByIdSuccess', mind)
                        resolve(mind)
                    } else {
                        ctx.commit('updateByIdFail', res.data['msg'])
                        reject(res.data['msg'])
                    }
                })
                .catch((err) => {
                    ctx.commit('updateByIdFail')
                    console.log(`err:`, err)
                })
        })
    },
}

const mind = {
    state,
    mutations,
    actions,
    getters,
}

export default mind
