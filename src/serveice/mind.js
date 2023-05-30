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
    addFiles(data) {

        var bodyFormData = new FormData();

        for (let i = 0; i < data.files.length; i++) {
            bodyFormData.append('files', data.files[i]);
        }

        bodyFormData.append('mind_id', data.mind_id);


        return axios({
            method: "post",
            url: "mind/add-file",
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data"},
        })
    },


}


export default MindService
