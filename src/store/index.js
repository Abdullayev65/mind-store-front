import {createStore} from 'vuex'
import auth from "@/models/auth.js"
import mind from "@/models/mind.js";
import file from "@/models/file.js";
import user from "@/models/user.js";

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth, mind, file, user
    }
})

export default store
