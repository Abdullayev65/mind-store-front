import axios from "axios";
import localStore from "@/helpers/persistaneStorage";

axios.defaults.baseURL = "https://mind-store.jprq.live/api/v1"
axios.defaults.baseURL = "https://back-end.jprq.live/api/v1"
// axios.defaults.baseURL = "http://localhost:8765/api/v1"

axios.interceptors.request.use(cnfg => {
    const token = localStore.getItem('token')
    const authorization = `Bearer ${token}`

    cnfg.headers.Authorization = authorization

    return cnfg
})

export default axios
