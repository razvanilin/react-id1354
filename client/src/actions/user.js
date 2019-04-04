import cookie from "react-cookies";
import { API_HOST } from "../config/settings";

export const FETCHING_USER = "FETCHING_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";

export function signup(data) {
  return (dispatch) => {
    const url = `${API_HOST}/user`;
    const method = "POST";
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
    });
    const body = JSON.stringify(data);

    dispatch({ type: FETCHING_USER });

    return fetch(url, { method, body, headers })
      .then((response) => {
        if (!response.ok) {
          dispatch({ type: FETCH_USER_ERROR });
          return new Promise((resolve, reject) => reject(response.status));
        }

        return response.json();
      })
      .then((user) => {
        dispatch({ type: FETCH_USER_SUCCESS, user });
        cookie.save("_mp_token_", user.token, { path: "/" });
        return new Promise(resolve => resolve(user));
      });
  };
}

export function login(data) {
  return (dispatch) => {
    const url = `${API_HOST}/user/login`;
    const method = "POST";
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
    });
    const body = JSON.stringify(data);

    return fetch(url, { body, method, headers })
      .then((response) => {
        if (!response.ok) {
          dispatch({
            type: FETCH_USER_ERROR,
          });
          return new Promise((resolve, reject) => reject(response.status));
        }

        return response.json();
      })
      .then((user) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          user,
        });
        cookie.save("_mp_token_", user.token, { path: "/" });

        return new Promise(resolve => resolve(user));
      });
  };
}

export function relog() {
  return (dispatch) => {
    const token = cookie.load("_mp_token_");
    if (!token) return new Promise((resolve, reject) => reject(401));

    const url = `${API_HOST}/user/relog`;
    const method = "POST";
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    return fetch(url, { method, headers })
      .then((response) => {
        if (!response.ok) {
          return new Promise((resolve, reject) => reject(response.status));
        }

        return response.json();
      })
      .then((user) => {
        dispatch({ type: FETCH_USER_SUCCESS, user });
        cookie.save("_mp_token_", user.token, { path: "/" });
        return new Promise(resolve => resolve(user));
      })
      .catch((error) => {
        return new Promise((resolve, reject) => reject(error));
      });
  };
}

export function logout() {
  return (dispatch) => {
    cookie.remove("_mp_token_", { path: "/" });
    dispatch({ type: LOGOUT_USER });
  };
}
