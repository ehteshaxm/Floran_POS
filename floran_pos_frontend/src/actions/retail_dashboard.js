import { GET_RETAIL_DASHBOARD,BASE_URL } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";

const url = `${BASE_URL}api/dashboard/`

export const getRetailDashboard = () => (dispatch,getState) => {
    axios.get(url,tokenConfig(getState)).then(
        res => {
            dispatch({
                type:GET_RETAIL_DASHBOARD,
                payload:res.data
            })
        }
    ).catch(
        err =>{
            console.log(err);
        }
    )
}