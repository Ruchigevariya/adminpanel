import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getPatientsData = () => {
    return getRequest('patients')
}

export const postPatientsData = (data) => {
    return postRequest('patients', data)
}

export const deletePatientsData = (id) => {
    return deleteRequest('patients/',id)
}

export const putPatientsData = (data) => {
    return putRequest('patients/',data)
}