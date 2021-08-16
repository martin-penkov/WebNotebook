import { requestOptions as reqOptions} from '../helpers/requestOptions'
import { API_URL } from '../config'

export const imageService = {
    exportCanvas,
    saveCanvas,
    removeImage,
    getUserImages,
    uploadFromFileManager
}

function exportCanvas(){
    let canvas = document.getElementById("canvas2d")
    let dataUrl = canvas.toDataURL()
    return dataUrl
}

async function removeImage(id){
    await fetch(`/Images/${id}`, reqOptions.deleteAuthReqOption())

}

async function saveCanvas(){
    let canvasImgBase64 = exportCanvas();
    sendBase64String(canvasImgBase64);
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

function uploadFromFileManager(e){
    let reader = new FileReader() 

    var htmlelemtnt = e.currentTarget.parentElement.querySelector("input").files[0]
    reader.readAsDataURL(htmlelemtnt)
    reader.onload = () => {
        sendBase64String(reader.result)
    }
}

function sendBase64String(base64Data){
    var base64result = base64Data.split(',')[1];

    let body = {
        "ImageBase64String": base64result, 
        "DateSent": (new Date(Date.now())).toJSON()
    }

    fetch('/Images/PostImageRaw', reqOptions.postAuthReqOption(body))
        .then(response => response.json())
}