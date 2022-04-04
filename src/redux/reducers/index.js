import * as actionTypes from '../action';

const initialState = {
    currDetail: [],
    validCurr: [],
    convertedAmountObject:{conversion_rate:"",conversion_result:""}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CURR:
            return {
                ...state,
                validCurr: action.value

            }
            case actionTypes.GET_CONVERTED_DATA:
                console.log(action.value)
                return {
                    ...state,
                    convertedAmountObject: {...action.value}
    
                }
            case actionTypes.GET_DETAILS:
                return {
                    ...state,
                    curr: action.value
    
                }
        case actionTypes.GET_DETAILS_FAILURE:
            return {
                ...state,
                currDetail: {
                    currDetail: []
                }
            }
        case actionTypes.GET_DETAILS_SUCESS:
            return {
                ...state,
                currDetail: action.value
            }
        default:
            return state;
    }
}
export default rootReducer;