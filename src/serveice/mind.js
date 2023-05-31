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
        if (data.hashed_id)
            bodyFormData.append('hashed_id', data.hashed_id);
        if (data.access)
            bodyFormData.append('access', data.access);


        return axios({
            method: "post",
            url: "mind/add-file",
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data"},
        })
    },


}


export default MindService
