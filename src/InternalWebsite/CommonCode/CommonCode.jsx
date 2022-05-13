import {basicFetchDataJson} from "../Client/Client";

export var ip_address = "http://192.168.1.40:3000";

export function nameFormatting(name){
    var realName = name.split("_");
    var newString = realName[0] + " " + realName[1];
    return newString;
}
export async function getCEOName(){
    var json = {
        temp: "temp"
    }
    var response = await basicFetchDataJson("/getCEOName", json);
    return await response.name;
}