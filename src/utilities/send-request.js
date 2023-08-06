import { getToken } from './users-service'

export default async function sendRequest(url, method = 'GET', payload = null){
    // Fetch accepts an options object as the 2nd arg
    // used to include a data payload, set headers, specify the method
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }
    const token = getToken();
    if(token){
        // need to add an authorization header
        // user the Logical or assignment operator
        options.headers ||= {};
        options.headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(url, options);
    // if res.ok is fale, then something went wrong
    if(res.ok) return await res.json();
    throw new Error('Bad Request');
}