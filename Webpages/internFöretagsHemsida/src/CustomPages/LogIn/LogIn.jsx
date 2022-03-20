import {basicFetchDataJson} from "../../Client/Client";


async function checkToken(){
    var json = {"token" : JSON.parse(localStorage.getItem("user")).token};
    var response  = await basicFetchDataJson("/checkToken", json);
    if(response.token === true){
        console.log("Returned True for token");
        return true;
    }
    else {
        console.log("Invalid token")
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
        console.log("Returned False");
        return false;
    }
    else {
        if(data.username === "CEO"){
            return checkToken();
        }
        console.log("Returned True for regular user");
        localStorage.setItem("user", JSON.stringify(data));
        return true;
    }
}