import AuthService from "@/serveice/auth.js";
import localStore from "@/helpers/persistaneStorage";

const state = {
    isLoading: false,
    user: null,
    err: null,
    isLoggedIn: false
}

const getters = {
    auth__user: state => {
        return state.user
    },
    auth__isLoggedIn: state => {
        return Boolean(state.isLoggedIn)
    },
    auth__isAnonymous: state => {
        return state.isLoggedIn === false
    },
}

const mutations = {
    registerStart(state) {
        state.isLoading = true
        state.user = null
        state.err = null
        state.isLoggedIn = false
    },
    registerSuccess(state, user) {
        state.isLoading = false
        state.user = user
        localStore.setItem('token', user.token)
        state.isLoggedIn = true
    },
    registerFail(state, err) {
        state.isLoading = false
        state.err = err
        state.isLoggedIn = false
    },
    loginStart(state) {
        state.isLoading = true
        state.user = null
        state.err = null
        state.isLoggedIn = false
    },
    loginSuccess(state, {user, token}) {
        localStore.setItem('token', token)
        state.isLoading = false
        state.user = user
        state.isLoggedIn = true
    },
    loginFail(state, err) {
        state.isLoading = false
        state.err = err
        state.isLoggedIn = false
    },
    currentUserStart(state) {
        state.isLoading = true
    },
    currentUserSuccess(state, user) {
        state.isLoading = false
        state.user = user
        state.isLoggedIn = true
    },
    currentUserFail(state, err) {
        state.isLoading = false
        state.err = err
        state.user = null
        state.isLoggedIn = false
    },
    getUserByUsernameStart(state) {
        // state.isLoading = true
    },
    getUserByUsernameSuccess(state, user) {
        // state.isLoading = false
        // state.user = user
        // state.isLoggedIn = true
    },
    getUserByUsernameFail(state, err) {
        // state.isLoading = false
        // state.err = err
        // state.user = null
        // state.isLoggedIn = false
    },
    logout(state) {
        state.user = null
        state.isLoggedIn = false
    },
}

const actions = {
    register(ctx, user) {
        return new Promise((resolve, reject) => {
            ctx.commit('registerStart')

            AuthService.register(user)
                .then((res) => {
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
    },
    login(ctx, user) {
        return new Promise((resolve, reject) => {
            ctx.commit('loginStart')

            AuthService.login(user)
                .then((res) => {
                    if (res.data['status']) {
                        user = res.data['res'].user
                        let token = res.data.res.token
                        ctx.commit('loginSuccess', {user, token})
                        resolve(user)
                    } else {
                        ctx.commit('loginFail', res.data['msg'])
                        reject(res.data['msg'])
                    }
                })
                .catch((err) => {
                    ctx.commit('loginFail')
                    console.log(`err:`, err)
                })
        })
    },
    getUserMe(ctx) {
        return new Promise((resolve, reject) => {
            ctx.commit('currentUserStart')

            AuthService.getUserMe()
                .then((res) => {
                    if (res.data['status']) {
                        const user = res.data['res']
                        ctx.commit('currentUserSuccess', user)
                        resolve(user)
                    } else {
                        ctx.commit('currentUserFail', res.data['msg'])
                        reject(res.data['msg'])
                    }
                })
                .catch((err) => {
                    ctx.commit('currentUserFail', err)
                    console.log(`err:`, err)
                    reject(err)
                })
        })
    },
    getUserByUsername(ctx, username) {
        return new Promise((resolve, reject) => {
            ctx.commit('getUserByUsernameStart')

            AuthService.getUserByUsername(username)
                .then((res) => {
                    if (res.data['status']) {
                        const user = res.data['res']
                        ctx.commit('getUserByUsernameSuccess', user)
                        resolve(user)
                    } else {
                        ctx.commit('getUserByUsernameFail', res.data['msg'])
                        reject(res.data['msg'])
                    }
                })
                .catch((err) => {
                    ctx.commit('getUserByUsernameFail', err)
                    console.log(`err:`, err)
                    reject(err)
                })
        })
    },
    logout(ctx) {
        return new Promise((resolve, reject) => {
            ctx.commit('logout')
            localStore.removeItem('token')
        })
    },
}

const auth = {
    state,
    mutations,
    actions,
    getters,
}

export default auth
