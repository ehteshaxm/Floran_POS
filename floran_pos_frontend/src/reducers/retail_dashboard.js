import { GET_RETAIL_DASHBOARD } from "../actions/types";

const initialState = {
    current_month_purchase:'',
    previous_month_purchase:'',

    most_purchased_product:[],

    year_list:[],
    month_list:[],
    day_list:[],

    years_data:[],
    months_data:[],
    current_month_data:[],

    suppliers_purchase_info:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    switch(action.type){
        case GET_RETAIL_DASHBOARD:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}   