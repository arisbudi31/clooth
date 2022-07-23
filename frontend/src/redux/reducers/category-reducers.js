import { GET_CATHEGORY } from "../actions/types";

const INITIAL_STATE = {
  categories: [],
  count: 0
}

function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATHEGORY:
      return {
        ...state,
        categories: action.payload,
        count: action.payload.count
      }
    default:
      return state
  }
}

export default categoryReducer