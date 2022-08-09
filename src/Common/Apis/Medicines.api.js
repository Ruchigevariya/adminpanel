import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"


export const getMedicinesData = () => {
    return getRequest('medicines')
}

export const postMedicinesData = (data) => {
    return postRequest('medicines',data)
}

export const deleteMedicinesData = (id) => {
    return deleteRequest('medicines/',id)
}

export const putMedicinesData = (data) => {
    return putRequest('medicines/', data)
}