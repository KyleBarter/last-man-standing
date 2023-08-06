// This file should only contain AJAX helper methods
//These are functions that make an API call to our server and return the response
// Any other functionality like saving a token to localStorage can be done in the service function
import sendRequest from "./send-request";
const BASE_URL = '/api/users'


export async function signUp(userData){
    return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials){
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function checkToken(){
    return sendRequest(`${BASE_URL}/check-token`)
}