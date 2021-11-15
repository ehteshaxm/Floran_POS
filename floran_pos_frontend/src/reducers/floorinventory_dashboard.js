import { GET_FLOOR_DASHBOARD } from "../actions/types";

const initialState = {
    total_order:'',
    pending:'',
    approve:'',

    dayList:[],
    graph_data:[],

    newPrd:[],
    regular:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    switch(action.type){
        case GET_FLOOR_DASHBOARD:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}   