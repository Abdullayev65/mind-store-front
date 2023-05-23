import axios from "@/serveice/axios";

const AuthService = {
    register(user) {
        return axios.post("auth/sign-up", user)
    },
    login(user) {
        return axios.post("auth/log-in", user)
    },
}


export default AuthService
