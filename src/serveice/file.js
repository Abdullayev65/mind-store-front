import axios from "@/serveice/axios";

const FileService = {
    getById(id) {
        return axios({
            url: `file/${id}`, //your url
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            // create file link in browser's memory
            // const href = URL.createObjectURL(response.data);
            console.log('response')
            console.log(response)

            return response

            // var binaryData = [];
            // binaryData.push(response);

            // var imageUrl = window.URL.createObjectURL(new Blob(binaryData, {type: response.headers['content-type']}));
            // document.querySelector("#image13").src = imageUrl;

            // var objectURL = URL.createObjectURL(response);

            // var binaryData = [];
            // binaryData.push(response);
            // return new Blob(binaryData, {type: response.headers['content-type']})
            //
            //
            // var objectURL=window.URL.createObjectURL(new Blob(binaryData, {type: response.headers['content-type']}))
            //
            // // console.log("response.headers['content-type']")
            // // console.log(response.headers['content-type'])
            //
            // document.getElementById("file_" + id).src = objectURL;

            // create "a" HTML element with href to file & click
            // const link = document.createElement('a');
            // link.href = href;
            // console.log("href:")
            // console.log(href)
            // link.setAttribute('download', 'file.p.d.f.'); //or any other extension
            // document.body.appendChild(link);
            // link.click();

            // clean up "a" element & remove ObjectURL
            // document.body.removeChild(link);
            // URL.revokeObjectURL(href);
        });
    },

}


export default FileService
