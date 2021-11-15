import { GET_ORDER,BASE_URL } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";

const url = `${BASE_URL}api/floorinventory/order/`

export const getOrders = () => (dispatch,getState) =>{
    axios.get(url,tokenConfig(getState)).then(
        res => {
            dispatch({
                type:GET_ORDER,
                payload: res.data
            })
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

export const createOrder = Order => (dispatch,getState) =>{
    axios.post(url,Order,tokenConfig(getState)).then(
        res => {
            console.log(res.data)
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}