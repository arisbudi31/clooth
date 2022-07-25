import Axios from "axios"
import {GET_ERROR_USER, GET_USER_DATA, GET_ORDERS, GET_ERROR_ORDERS, GET_REPORT, GET_ERROR_REPORT} from './types'

const API_URL = process.env.REACT_APP_API_URL

export const getUsersData = (token, sort, order, page, limit) => {
    return async (dispatch) => {
        try{
            const resp = await Axios.get(API_URL + `/admin/${token}/get-users-data?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            dispatch({type: GET_USER_DATA, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        }
        catch(err){
            dispatch({type: GET_ERROR_USER, payload: {error: err}})
        }
    }
}

export const changeUserPermit = (token, userId, body, page, limit) => {
    return async (dispatch) => {
        try{
           await Axios.patch(API_URL + `/admin/${token}/change-permit/${userId}`, body)
           const respond = await Axios.get(API_URL + `/admin/${token}/get-users-data?_page=${page}&_limit=${limit}`)
           dispatch({type: GET_USER_DATA, payload: {data: respond.data.data, count: respond.data.total_data, error: ''}})
        }catch(err) {
            dispatch({type: GET_ERROR_USER, payload: {error: err}})
        }
    }
}

export const sortUsersData = (token, sort, order, page, limit) => {
    return async(dispatch) => {
        try {
            const resp = await Axios.get(API_URL + `/admin/${token}/get-users-data?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            dispatch({type: GET_USER_DATA, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        } catch (err) {
        }
    }
} 

export const getNewOrders = (token, sort, order, page, limit) => {
    return async (dispatch) => {
        try{
            const resp = await Axios.get(API_URL + `/admin/${token}/get-new-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            dispatch({type: GET_ORDERS, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        }
        catch(err){
            dispatch({type: GET_ERROR_ORDERS, payload: {error: err}})
        }
    }
}

export const getAllOrders = (token, sort, order, page, limit) => {
    return async (dispatch) => {
        try{
            const resp = await Axios.get(API_URL + `/admin/${token}/get-all-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            dispatch({type: GET_ORDERS, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        }
        catch(err){
            dispatch({type: GET_ERROR_ORDERS, payload: {error: err}})
        }
    }
}

export const approveOrder = (token, invId, body, sort, order, page, limit) => {
    return async (dispatch) => {
        try{
           await Axios.patch(API_URL + `/admin/${token}/approve-order/${invId}`, body)
           const respond = await Axios.get(API_URL + `/admin/${token}/get-new-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
           dispatch({type: GET_ORDERS, payload: {data: respond.data.data, count: respond.data.total_data, error: ''}})
        }catch(err) {
            dispatch({type: GET_ERROR_ORDERS, payload: {error: err}})
        }
    }
}

export const sortNewOrders = (token, sort, order, page, limit) => {
    return async(dispatch) => {
        try {
            const resp = await Axios.get(API_URL + `/admin/${token}/get-new-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            dispatch({type: GET_ORDERS, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        } catch (err) {
        }
    }
}

export const sortAllOrders = (token, sort, order, page, limit) => {
    return async(dispatch) => {
        try {
            const resp = await Axios.get(API_URL + `/admin/${token}/get-all-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            dispatch({type: GET_ORDERS, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        } catch (err) {
        }
    }
}
