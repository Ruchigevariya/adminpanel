import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getDoctersData = () => {
    return getRequest('docter')
}

export const postDoctersData = (data) => {
    return postRequest('docter' , data)
}

export const deleteDoctersData = (id) => {
    return deleteRequest('docter/' , id)
}

export const putDoctersData = (data) => {
    return putRequest('docter/' , data)
}