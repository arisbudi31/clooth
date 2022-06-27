import {GET_ADMIN_DATA, DELETE_ADMIN_DATA} from '../actions/types'

const INITIAL_STATE = {
    adminname: "",
    fullname: "",
    email: "",
}

export default function adminReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ADMIN_DATA :
            return {...state,
                userId: action.payload.userId,
                adminname: action.payload.adminname,
                fullname: action.payload.fullname,
                email: action.payload.email
            }
        case DELETE_ADMIN_DATA :
            return INITIAL_STATE
        default :
            return state
    }
}
