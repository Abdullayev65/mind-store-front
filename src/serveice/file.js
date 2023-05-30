import axios from "@/serveice/axios";

const FileService = {
    getById(id) {
        return axios({
            url: `file/${id}`,
            method: 'GET',
            responseType: 'blob',
        });
    },

}


export default FileService
