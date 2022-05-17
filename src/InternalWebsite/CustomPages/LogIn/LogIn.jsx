import {basicFetchDataJson} from "../../Client/Client";

//Checks user credentials against database and return user data if the credentials are correct
export async function getAccountData(json){
    const data = await basicFetchDataJson("/getUser", json);
    if(data.error){
        alert(data.error);
        return false;
    }
    else {
        localStorage.setItem("user", JSON.stringify(data));
        return true;
    }
}