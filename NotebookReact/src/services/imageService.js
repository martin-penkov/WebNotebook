import { requestOptions as reqOptions} from '../helpers/requestOptions'
import { API_URL } from '../config'

export const imageService = {
    exportCanvas,
    saveCanvas,
    saveImage,
    getUserImages
}

function exportCanvas(){
    let canvas = document.getElementById("canvas2d")
    let dataUrl = canvas.toDataURL()
    return dataUrl
}

function saveImage(){

}

async function saveCanvas(){
    let canvasImgBase64 = exportCanvas();
    let exportData = canvasImgBase64.substring("data:image/png;base64,".length)
    let body = {
        "ImageBase64String": exportData, 
        "DateSent": (new Date(Date.now())).toJSON()
    }
    return fetch('/Images/PostImageRaw', reqOptions.postAuthReqOption(body))
        .then(response => response.json())
}

async function getUserImages(){
    var promise = await fetch('/Images/GetImageIDsUser', reqOptions.getAuthReqOption())
            
    var response = await promise.json()


    let imageUrls = response.map(id => ({
        url: `${API_URL}Images/${id}`,
        id: id
    }))

    return imageUrls
    // if (!data.ok) {
    //     throw Error("Couldn't fetch user images.")
    // }
}