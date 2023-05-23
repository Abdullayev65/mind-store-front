import axios from "@/serveice/axios";

const AuthService = {
    register(user) {
        return axios.post("auth/sign-up", user)
    }
}


export default AuthService
