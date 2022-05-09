import {basicFetchDataJson} from "../Client/Client";

export var ip_address = "http://95.80.24.200:3000";

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