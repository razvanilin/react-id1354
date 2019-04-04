import {
  FETCHING_RECIPES,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_ERROR,
  UPDATE_RECIPE,
} from "../actions/recipe";

export default function recipe(state = {
  loading: false,
  error: false,
  data: [],
  selected: {},
}, action) {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state, data: action.recipes, loading: false, error: false
      };
    case UPDATE_RECIPE:
      let indexFound = -1;
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === parseInt(action.recipe.id, 10)) {
          indexFound = i;
          break;
        }
      }
      const newData = [...state.data];
      if (indexFound > -1) {
        newData[indexFound] = action.recipe;
      } else {
        newData.push(action.recipe);
      }
      return {
        ...state, loading: false, data: newData, selected: action.recipe
      };
    case FETCHING_RECIPES:
      return { ...state, loading: true, error: false };
    case FETCH_RECIPES_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
