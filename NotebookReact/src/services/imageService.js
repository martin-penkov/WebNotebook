import { React } from 'react'
import { requestOptions as reqOptions} from '../helpers/requestOptions'

export const imageService = {
    exportCanvas,
    saveCanvas,
    saveImage
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
    return fetch('/Images/PostImageRaw', reqOptions.postAuthReqOption(
        {
            'ImageBase64String': canvasImgBase64, 
            'DateSent': Date.now()
        }))
        .then(response => response.json())
}