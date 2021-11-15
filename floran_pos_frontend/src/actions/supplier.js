import { GET_SUPPLIER,CREATE_SUPPLIER,UPDATE_SUPPLIER,DELETE_SUPPLIER,BASE_URL } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";

const url = `${BASE_URL}api/supplier/`

export const getSuppliers = () => (dispatch,getState) => {
    axios.get(url,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: GET_SUPPLIER,
                payload: res.data
            })
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

export const createSupplier = Supplier => (dispatch,getState) => {
    axios.post(url,Supplier,tokenConfig(getState)).then(
        res => {
            dispatch({
                type:CREATE_SUPPLIER,
                payload:res.data
            })
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

export const updateSupplier = UpdatedSupplier => (dispatch,getState) => {
    axios.patch(url,UpdatedSupplier,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: UPDATE_SUPPLIER,
                payload: res.data
            })
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

export const deleteSupplier = (id) => (dispatch,getState) => {
    axios.delete(url+`${id}/` ,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: DELETE_SUPPLIER,
                payload: id
            });
        }
    ).catch( err => console.log(err))
}