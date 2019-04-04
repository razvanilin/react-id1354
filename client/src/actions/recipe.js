import cookie from "react-cookies";

import { API_HOST } from "../config/settings";

export const FETCHING_RECIPES = "FETCHING_RECIPES";
export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
export const FETCH_RECIPES_ERROR = "FETCH_RECIPES_ERROR";
export const SELECT_RECIPE = "SELECT_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";

export function getRecipes() {
  return (dispatch) => {
    const url = `${API_HOST}/recipe`;
    const method = "GET";
    const headers = new Headers({
      "Accept": "application/json",
    });

    dispatch({ type: FETCHING_RECIPES });

    return fetch(url, { method, headers })
      .then((response) => {
        if (!response.ok) {
          dispatch({ type: FETCH_RECIPES_ERROR });
          return new Promise((resolve, reject) => reject(response.status));
        }

        return response.json();
      })
      .then((recipes) => {
        dispatch({
          type: FETCH_RECIPES_SUCCESS,
          recipes,
        });

        return new Promise(resolve => resolve(recipes));
      });
  };
}

export function getRecipe(id) {
  return (dispatch, getState) => {
    // first check if the recipe is already in the state
    const { recipes } = getState();
    const newArray = recipes.data.filter((recipe) => {
      return recipe.id === id;
    });

    if (newArray.length > 0) {
      dispatch({
        type: SELECT_RECIPE,
        id,
      });

      return new Promise(resolve => resolve(newArray[0]));
    }

    // if the recipe is not in the state, fetch it from the api
    const url = `${API_HOST}/recipe/${id}`;
    const method = "GET";
    const headers = new Headers({
      "Accept": "application/json",
    });

    dispatch({ type: FETCHING_RECIPES });

    return fetch(url, { method, headers })
      .then((response) => {
        if (!response.ok) {
          dispatch({ type: FETCH_RECIPES_ERROR });
          return new Promise((resolve, reject) => reject(response.status));
        }

        return response.json();
      })
      .then((recipe) => {
        dispatch({
          type: UPDATE_RECIPE,
          recipe,
        });

        return new Promise(resolve => resolve(recipe));
      });
  };
}

export function postComment(recipeId, data) {
  return (dispatch) => {
    const token = cookie.load("_mp_token_");
    const url = `${API_HOST}/recipe/${recipeId}/comment`;
    const method = "POST";
    const body = JSON.stringify({ message: data });
    const headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    return fetch(url, { method, body, headers })
      .then((response) => {
        if (!response.ok) {
          return new Promise((resolve, reject) => reject(response.status));
        }
        return response.json();
      })
      .then((recipe) => {
        dispatch({
          type: UPDATE_RECIPE,
          recipe,
        });

        return new Promise(resolve => resolve(recipe));
      });
  };
}
