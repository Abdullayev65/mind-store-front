import axios from "@/serveice/axios";

const AuthService = {
    register(user) {
        return axios.post("auth/sign-up", user)
    },
    login(user) {
        return axios.post("auth/log-in", user)
    },
    getUser() {
        return axios.get('user/me')
    },
    searchUsers(params) {
        return axios.get('user/search', {params})
    },
}


export default AuthService
