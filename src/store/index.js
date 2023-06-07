import {createStore} from 'vuex'
import auth from "@/models/auth.js"
import mind from "@/models/mind.js";
import file from "@/models/file.js";
import user from "@/models/user.js";

const store = createStore({
    state() {
        return {
            gotHashword: 0,
            hashwordMap: new Map(),
            setHashword(hashwordId, hashword) {
                store.state.hashwordMap.set(hashwordId, hashword)
                store.state.gotHashword++
            },
            getHashword(hashwordId) {
                return store.state.hashwordMap.get(hashwordId)
            },

        }
    },
    mutations: {},
    actions: {},
    modules: {
        auth, mind, file, user
    }
})

export default store
