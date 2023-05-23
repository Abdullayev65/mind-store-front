import AuthService from "@/serveice/auth.js";

const state = {
    isLoading: false,
    user: null,
    err: null
}

const mutations = {
    registerStart(state) {
        state.isLoading = true
        state.user = null
        state.err = null
    },
    registerSuccess(state, user) {
        state.isLoading = false
        state.user = user
    },
    registerFail(state, err) {
        state.isLoading = false
        state.err = err
    },
}

const actions = {
    register(ctx, user) {
        return new Promise((resolve, reject) => {
            ctx.commit('registerStart')

            AuthService.register(user)
                .then((res) => {
                    console.log(state.isLoading)
                    if (res.data['status']) {
                        user.token = res.data['res'].token
                        ctx.commit('registerSuccess', user)
                        resolve(user)
                    } else {
                        ctx.commit('registerFail', res.data['msg'])
                        reject(res.data['msg'])
                    }
                })
                .catch((err) => {
                    ctx.commit('registerFail')
                    console.log(`err:`, err)
                })
        })
    }
}

const auth = {
    state,
    mutations,
    actions,
}

export default auth
