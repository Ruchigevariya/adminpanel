import { getRequest, postRequest } from "../Request"


export const getMedicinesData = () => {
    return getRequest('medicines')
}

export const postMedicinesData = (data) => {
    return postRequest('medicines',data)
}