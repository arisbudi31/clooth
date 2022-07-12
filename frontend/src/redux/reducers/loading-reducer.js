import {LOADING_START, LOADING_END} from '../actions/types'

const INITIAL_STATE = {
    loading : false
}

export default function loadingReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING_START :
            return {...state, loading : true}
        case LOADING_END :
            return INITIAL_STATE
        default :
            return state 
    }
}
