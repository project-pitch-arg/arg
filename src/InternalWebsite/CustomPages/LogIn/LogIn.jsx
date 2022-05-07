import {basicFetchDataJson} from "../../Client/Client";
import {getCEOName} from "../../CommonCode/CommonCode";

var ceoName = "";

async function loadCEO(){
    ceoName = await getCEOName();
}
//Extra check for security purposes of the CEO account before returning account information
export async function getAccountData(json){
    var data = await basicFetchDataJson("/getUser", json);
    if(data.error){
        alert(data.error);
        return false;
    }
    else {
        localStorage.setItem("user", JSON.stringify(data));
        return true;
    }
}