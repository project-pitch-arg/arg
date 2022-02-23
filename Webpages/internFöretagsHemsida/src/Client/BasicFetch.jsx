import {fetchData} from "./client";

export async function basicFetchData(path){
    var json = {
        text: "hello"
    }
    const response = await fetchData(path, json);
    return await response.json();
}
export async function basicFetchDataJson(path, json){
    const response = await fetchData(path, json);
    return await response.json();
}