import {createStore} from 'vuex'
import auth from "@/models/auth.js"
import mind from "@/models/mind.js";
import file from "@/models/file.js";

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth, mind, file
    }
})

export default store
