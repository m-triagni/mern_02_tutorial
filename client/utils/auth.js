import cookie from 'js-cookie'
import Router from 'next/router';
import { listPage } from '../listPage';
import { listEnum } from '../listEnum';

//set in cookie
export const setCookie = (key,value) => {
    if(process.browser) {
        cookie.set(key, value, {
            expires: 1 // cookie will be expired in 1 day
        })
    }
}

//remove from cookie
export const removeCookie = (key) => {
    if(process.browser) {
        cookie.remove(key)
    }
}

//get data from cookie, such as: token. It will be useful when we need to make request to server with auth token
export const getCookie = (key, req) => { 
    const pbrowser = process.browser;
    let cook = undefined;

    if (pbrowser) {
        cook = getCookieFromBrowser(key);
     }
    else {
        cook = getCookieFromServer(key,req);
     } 
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key,req);
}

export const getCookieFromBrowser = (key) => {
    return cookie.get(key);
}

export const getCookieFromServer = (key, req) => {

    if (!req.headers.cookie) {
        return undefined;
    }
    let token = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if(!token) {
        return undefined;
    }
    let tokenValue = token.split('=')[1];

    return tokenValue;
}

//set in localstorage
export const setLocalStorage = (key, value) => {
    if(process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from localstorage
export const removeLocalStorage = (key) => {
    if(process.browser) {
        localStorage.removeItem(key)
    }
}

//authenticate 
export const authenticate = (response, next) => {
    setCookie(listEnum.browserStorageKey.token, response.data.token);
    setLocalStorage(listEnum.browserStorageKey.user, response.data.user);
    next();
}

//access user info from local storage
export const isAuth = () => {
    if(process.browser) {
        const cookieChecked = getCookie(listEnum.browserStorageKey.token)
        if (cookieChecked) {
             if(localStorage.getItem(listEnum.browserStorageKey.user)) {
                return JSON.parse(localStorage.getItem(listEnum.browserStorageKey.user));
            } else {
                return false;
            }
        }
    }
}

export const logout = () => {
    removeLocalStorage(listEnum.browserStorageKey.user);
    removeCookie(listEnum.browserStorageKey.token);
    Router.push(listPage.Page_Login);
}

export const updateUser = (user, next) => {
    if (process.browser) {
        if (localStorage.getItem(listEnum.browserStorageKey.user)) {
            localStorage.setItem(listEnum.browserStorageKey.user, JSON.stringify(user));
            next();
        }
    }
};
