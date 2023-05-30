import FileService from "@/serveice/file.js";
import localStore from "@/helpers/persistaneStorage";

const state = {
    isLoading: false,
    filesMap: new Map(),
    err: null,
    isLoggedIn: false
}

const getters = {}

const mutations = {
    getFileByIdStart(state) {
    },
    getFileByIdSuccess(state, {id, f}) {
        state.filesMap.set(id, f)
    },
    getFileByIdFail(state, err) {
    },
}

const actions = {
    getFileById(ctx, id) {
        return new Promise((resolve, reject) => {
            ctx.commit('getFileByIdStart')

            FileService.getById(id)
                .then((res) => {

                    ctx.commit('getFileByIdSuccess', {id:id, f:res})
                    resolve(res)
                })
                .catch((err) => {
                    ctx.commit('getFileByIdFail')
                    console.log(`err:`, err)
                    reject(err)
                })
        })
    },
}

const file = {
    state,
    mutations,
    actions,
    getters,
}

export default file
