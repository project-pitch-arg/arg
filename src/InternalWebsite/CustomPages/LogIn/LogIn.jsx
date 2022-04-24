import {basicFetchDataJson} from "../../Client/Client";

//Checks the token linked to the current users ip adress
async function checkToken(){
    var json = {"token" : JSON.parse(localStorage.getItem("user")).token};
    var response  = await basicFetchDataJson("/checkToken", json);
    if(response.token === true){
        return true;
    }
    else {
        return false;
    }
}

//Extra check for security purposes of the CEO account before returning account information
export async function getAccountData(json){
    if(json.username === "CEO"){
        return checkToken();
    }
    var data = await basicFetchDataJson("/getUser", json);
    if(data.error){
        alert(data.error);
        return false;
    }
    else {
        if(data.username === "CEO"){
            return checkToken();
        }
        localStorage.setItem("user", JSON.stringify(data));
        return true;
    }
}