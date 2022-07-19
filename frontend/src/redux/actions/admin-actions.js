import Axios from "axios"
import {GET_ERROR_USER, GET_USER_DATA, GET_ORDERS, GET_ERROR_ORDERS} from './types'

const API_URL = process.env.REACT_APP_API_URL

export const getUsersData = (token, sort, order, page, limit) => {
    return async (dispatch) => {
        try{
            const resp = await Axios.get(API_URL + `/admin/${token}/get-users-data?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            console.log(`list data users:`, resp);
            dispatch({type: GET_USER_DATA, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        }
        catch(err){
            console.log(`error when dispatch user data:`, err);
            dispatch({type: GET_ERROR_USER, payload: {error: err}})
        }
    }
}

export const changeUserPermit = (token, userId, body, page, limit) => {
    return async (dispatch) => {
        try{
           await Axios.patch(API_URL + `/admin/${token}/change-permit/${userId}`, body)
           const respond = await Axios.get(API_URL + `/admin/${token}/get-users-data?_page=${page}&_limit=${limit}`)
           console.log('respond when change user permit:', respond);
           dispatch({type: GET_USER_DATA, payload: {data: respond.data.data, count: respond.data.total_data, error: ''}})
        }catch(err) {
            console.log(`error when change user permit:`, err);
            dispatch({type: GET_ERROR_USER, payload: {error: err}})
        }
    }
}

export const sortUsersData = (token, sort, order, page, limit) => {
    return async(dispatch) => {
        try {
            const resp = await Axios.get(API_URL + `/admin/${token}/get-users-data?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            console.log(`respond at sorting user:`, resp);
            dispatch({type: GET_USER_DATA, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        } catch (err) {
            console.log(err)
        }
    }
} 

export const getNewOrders = (token, sort, order, page, limit) => {
    return async (dispatch) => {
        try{
            const resp = await Axios.get(API_URL + `/admin/${token}/get-new-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            console.log(`list new orders:`, resp);
            dispatch({type: GET_ORDERS, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        }
        catch(err){
            console.log(`error when dispatch new orders:`, err);
            dispatch({type: GET_ERROR_ORDERS, payload: {error: err}})
        }
    }
}

export const getAllOrders = (token, sort, order, page, limit) => {
    return async (dispatch) => {
        try{
            const resp = await Axios.get(API_URL + `/admin/${token}/get-all-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            console.log(`list all orders:`, resp);
            dispatch({type: GET_ORDERS, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        }
        catch(err){
            console.log(`error when dispatch all orders:`, err);
            dispatch({type: GET_ERROR_ORDERS, payload: {error: err}})
        }
    }
}

export const approveOrder = (token, invId, body, sort, order, page, limit) => {
    return async (dispatch) => {
        try{
           await Axios.patch(API_URL + `/admin/${token}/approve-order/${invId}`, body)
           const respond = await Axios.get(API_URL + `/admin/${token}/get-new-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
           console.log('respond when approve order:', respond);
           dispatch({type: GET_ORDERS, payload: {data: respond.data.data, count: respond.data.total_data, error: ''}})
        }catch(err) {
            console.log(`error when approve order:`, err);
            dispatch({type: GET_ERROR_ORDERS, payload: {error: err}})
        }
    }
}

export const sortNewOrders = (token, sort, order, page, limit) => {
    return async(dispatch) => {
        try {
            const resp = await Axios.get(API_URL + `/admin/${token}/get-new-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            console.log(`respond at sorting new order:`, resp);
            dispatch({type: GET_ORDERS, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        } catch (err) {
            console.log(err)
        }
    }
}

export const sortAllOrders = (token, sort, order, page, limit) => {
    return async(dispatch) => {
        try {
            const resp = await Axios.get(API_URL + `/admin/${token}/get-all-orders?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
            console.log(`respond at sorting all order:`, resp);
            dispatch({type: GET_ORDERS, payload: {data: resp.data.data, count: resp.data.total_data, error: ''}})
        } catch (err) {
            console.log(err)
        }
    }
}