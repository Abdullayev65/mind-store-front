import axios from "@/serveice/axios";

const FileService = {
    getById(id) {
        return axios({
            url: `file/${id}`,
            method: 'GET',
            responseType: 'blob',
        });
    },
    deleteFileFromMind(data) {
        return axios.delete(`mind/delete-file/${data.mind_id}/${data.file_id}`)
    },

}


export default FileService
