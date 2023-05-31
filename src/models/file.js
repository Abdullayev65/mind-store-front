import FileService from "@/serveice/file.js";

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
    deleteFileFromMindStart(state) {
    },
    deleteFileFromMindSuccess(state, {id, f}) {
    },
    deleteFileFromMindFail(state, err) {
    },

}

const actions = {
    getFileById(ctx, id) {
        return new Promise((resolve, reject) => {
            ctx.commit('getFileByIdStart')

            FileService.getById(id)
                .then((res) => {

                    ctx.commit('getFileByIdSuccess', {id: id, f: res})
                    resolve(res)
                })
                .catch((err) => {
                    ctx.commit('getFileByIdFail')
                    console.log(`err:`, err)
                    reject(err)
                })
        })
    },
    deleteFileFromMind(ctx, data) {
        return new Promise((resolve, reject) => {
            ctx.commit('deleteFileFromMindStart')

            FileService.deleteFileFromMind(data)
                .then((res) => {

                    if (!res.data['status'])
                        throw res['msg']
                    ctx.commit('deleteFileFromMindSuccess', res.data)
                    resolve(res.data)
                })
                .catch((err) => {
                    ctx.commit('deleteFileFromMindFail')
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
