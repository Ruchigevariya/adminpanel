import { combineReducers } from "redux"
import { conunterReducer } from "./Counter.reducer"
import { medicinesReducer } from "./Medicines.reducer"
import { pattientsReducer } from "./Patients.reducer"

export const rootreducer = combineReducers ({
    counter :conunterReducer,
    Medicines : medicinesReducer,
    Patients: pattientsReducer
})