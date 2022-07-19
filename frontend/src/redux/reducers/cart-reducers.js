import { GET_CARTS } from "../actions/types";

const INITIAL_STATE = {
    data: [],
    count : 0
}

export default function cartReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CARTS :
            return {...state, data : action.payload.data, count: action.payload.count}
        default :
            return state
    }
}