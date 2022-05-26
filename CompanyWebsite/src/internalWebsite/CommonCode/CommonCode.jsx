import {basicFetchDataJson} from "../Client/Client";

export var ip_address = "http://localhost:3000";

export function nameFormatting(name){
    const realName = name.split("_");
    return realName[0] + " " + realName[1];
}
export async function getCEOName(){
    const json = {
        temp: "temp"
    };
    const response = await basicFetchDataJson("/getCEOName", json);
    return await response.name;
}