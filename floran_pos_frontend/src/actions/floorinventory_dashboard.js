import { GET_FLOOR_DASHBOARD,BASE_URL } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";

const url = `${BASE_URL}api/floorinventory/dashboard/`

export const getFloorDashboard = () => (dispatch,getState) => {
    axios.get(url,tokenConfig(getState)).then(
        res => {
            dispatch({
                type:GET_FLOOR_DASHBOARD,
                payload:res.data
            })
        }
    ).catch(
        err =>{
            console.log(err);
        }
    )
}