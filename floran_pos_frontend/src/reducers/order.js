import { GET_ORDER } from "../actions/types";
const initialState = {
    order : [],
    orderitems: [],
    itemprd : [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    switch(action.type){
        case GET_ORDER:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}