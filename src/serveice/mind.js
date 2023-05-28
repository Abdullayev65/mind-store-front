import axios from "@/serveice/axios";

const MindService = {
    getById(id) {
        return axios.get(`mind/with-sub-minds/${id}`)
    },
    getSubMindsById(id) {
        return axios.get(`mind/sub-minds/${id}`)
    },
    updateById(mind) {
        return axios.put(`mind/${mind.id}`, mind)
    },


}


export default MindService
