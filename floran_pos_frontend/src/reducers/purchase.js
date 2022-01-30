import { GET_PURCHASE,CREATE_PURCHASE,PURCHASE_DETAIL} from "../actions/types";
const initialState = {
    instate_data: [],
    outstate_data: [],
    invoiceDetail:[],
    invoicePrds: [],
    total_cost:0,
    total_cgst:0,
    total_sgst:0,
    total_igst:0,
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
        
        case PURCHASE_DETAIL:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}