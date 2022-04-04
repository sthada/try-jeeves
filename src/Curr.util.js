export const getValidCurrencies = (currList) =>{
    let validCurr=[];
    currList.forEach(item => {
        let tempVal=item[0]+" ("+item[1]+")";
        validCurr.push({key:item[0], text:tempVal })}
        )
    return validCurr;    
}