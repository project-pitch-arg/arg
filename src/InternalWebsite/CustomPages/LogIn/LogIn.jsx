import {basicFetchDataJson} from "../../Client/Client";

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