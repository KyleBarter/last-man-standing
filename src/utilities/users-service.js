// Servie file, we can create any function we like,
// like including calling API methods and using their response
// to run additional functionality like saving 
// the token to local storage

// This is the AJAX request helper function
import * as usersAPI from "./users-api";

export async function signUp(userData){
    // execute API call
    // Perform another task with the data we receive
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token)
    return token;
}

export async function login(credentials){
    const token = await usersAPI.login(credentials)
    localStorage.setItem('token', token)
    return getUser()
}

export function logOut(){
    localStorage.removeItem('token')
}

export function getToken(){
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null
    }
    return token;
}

export function checkToken(){
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr));
}

export function getUser(){
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}