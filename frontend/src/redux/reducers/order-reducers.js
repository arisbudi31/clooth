import { GET_ORDERS, GET_ERROR_ORDERS } from "../actions/types";

const INITIAL_STATE = {
    data : [],
    count : 0
}

export default function orderReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ORDERS :
            return {...state, data : action.payload.data, count: action.payload.count}
        case GET_ERROR_ORDERS :
            return {...state, error: action.payload.error}
        default :
            return state
    }
}