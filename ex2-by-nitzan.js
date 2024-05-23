const axios = require('axios');

const baseURL = 'http://localhost:6767';
const myID = 313289472; 
const myYearOfBirth = 1995;

async function getMethod (){
    try {
        const response = await axios.get(`${baseURL}/test_get_method`, {
            params: {
                id: myID ,
                year: myYearOfBirth
            }
        });
        return response.data;
    } catch (error){
        console.error("Error in Get Method: " , error.response.data);
        throw error;
    }
}

async function postMethod (getResponse) {
    try{
        const response = await axios.post(`${baseURL}/test_post_method`, {
                id: myID ,
                year: myYearOfBirth ,
                requestId: getResponse
        });
        return response.data.message;
    } catch (error){
        console.error("Error in Post Method: " , error.response.data);
        throw error;
    }
}

async function putMethod (postResponseMessage){
    const newID = (myID - 123503) % 92;
    const newYear = (myYearOfBirth + 123 ) % 45;
    try{
        const response = await axios.put(`${baseURL}/test_put_method` , {
            id: newID ,
            year: newYear
        } , {
            params: {
                id: postResponseMessage
            }
        })

        return response.data.message;
    } catch (error){
        console.error("Error in PUT Method: ", error.response.data);
        throw error;
    }
}

async function deleteMethod (putResponseMessage){
    try{
        const response = await axios.delete(`${baseURL}/test_delete_method`, {
            params: {
                id: putResponseMessage
            }
        })
    } catch (error) {
        console.error("Error in DELETE Method: " , error.response.data);
        throw error;
    }
}

async function main (){
    try{
    const get_response = await getMethod();
    const post_response = await postMethod(get_response);
    const put_response = await putMethod(post_response);
    await deleteMethod(put_response);
    } catch (error){
        console.error("ERROR! ", error.message);
    }
}

main();