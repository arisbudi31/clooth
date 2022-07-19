import {GET_USER_DATA, GET_ERROR_USER} from '../actions/types'

const INITIAL_STATE = {
    data: [],
    count: 0,
    error: []
}

export default function userReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER_DATA :
            return {...state, data : action.payload.data, count: action.payload.count, error: action.payload.error}
        case GET_ERROR_USER :
            return {...state, error: action.payload.error}
        default :
            return state
    }
}