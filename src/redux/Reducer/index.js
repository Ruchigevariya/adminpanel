import { combineReducers } from "redux"
import { conunterReducer } from "./Counter.reducer"

export const rootreducer = combineReducers ({
    counter :conunterReducer
})