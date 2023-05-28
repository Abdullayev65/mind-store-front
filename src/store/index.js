import {createStore} from 'vuex'
import auth from "@/models/auth.js"
import mind from "@/models/mind.js";

const store = createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth, mind
	}
})

export default store
