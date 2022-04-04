/**
 * Created by Shivam on  -29-Mar-22.
 */

 import axios from 'axios';
 import { API_KEY } from '../../Constants';

 export const getValidCurrCodes = ()=>{
    return (dispatch) => {
 
        return axios.get("https://v6.exchangerate-api.com/v6/"+API_KEY+"/codes").then((res) => {
            dispatch({
                type: 'GET_ALL_CURR',
                value: res.data.supported_codes,
            })
            return false;
        }).catch((error) => {
            alert("There was an error in uploading the event. Kindly try again in sometime");
            dispatch({
                type: "global/STOP_LOADING"
            })

        });
    }
 }
 export const onClickApplyFilter = ({base, target, amount}) => {
     return (dispatch) => {
 
         return axios.get("https://v6.exchangerate-api.com/v6/"+API_KEY+"/pair/"+base+"/"+target+"/"+amount).then((res) => {
            //  console.log(JSON.stringify(res));
             dispatch({
                 type: 'GET_CONVERTED_DATA',
                 value: res.data
                 ,
             })
             return false;
         }).catch((error) => {
             alert("There was an error in uploading the event. Kindly try again in sometime");
             dispatch({
                 type: "global/STOP_LOADING"
             })
 
         });
     }
 }
 export const onClickGetDetails = (curr) => {
    return (dispatch) => {

        return axios.get("https://v6.exchangerate-api.com/v6/"+API_KEY+"/latest/"+curr).then((res) => {
            // console.log("1"+JSON.stringify(res));
            dispatch({
                type: 'GET_DETAILS',
                value: res.data.results,
            })
            return false;
        }).catch((error) => {
            alert("There was an error in uploading the event. Kindly try again in sometime");
            dispatch({
                type: "global/STOP_LOADING"
            })

        });
    }
}
 