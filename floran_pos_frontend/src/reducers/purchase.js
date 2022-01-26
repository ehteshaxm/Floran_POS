import { GET_PURCHASE,CREATE_PURCHASE} from "../actions/types";
const initialState = {
    instate_data: [],
    outstate_data: [],
    invCreated:false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    switch(action.type){
        case GET_PURCHASE:
            return{
                ...state,
                ...action.payload,
                invCreated:false
            };
        
        case CREATE_PURCHASE:
            return{
                ...state,
                invCreated:true
            }
        default:
            return state
    }
}