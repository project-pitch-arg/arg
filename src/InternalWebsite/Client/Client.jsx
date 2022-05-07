//Standard ip for server
const path = "http://95.80.24.200:3000";

//Standard post request to server
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

//Used the path + parameter data to send fetch request to server
export function fetchData(postPath, data){
        options.body = JSON.stringify(data);
      return fetch(path + postPath, options);
}

//Handles the most used way to request and use data
export async function basicFetchData(path){
    var json = {}
    const response = await fetchData(path, json);
    const data = await response.json();
    var array = [];
    try {
        Object.keys(data[0]).forEach((key) => {
                  array.push(data[0][key]);
            })
    }
    catch {
        Object.keys(data).forEach((key,index) => {
            data[key].forEach((value) => {
                array.push(value)
            })
        })
    }
    return array;
}

//Handles cases when the server needs information from the client
export async function basicFetchDataJson(path, json){
    const response = await fetchData(path, json);
    return await response.json();
}




