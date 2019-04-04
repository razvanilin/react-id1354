import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";
import recipes from "./recipe";

export default history => combineReducers({
  router: connectRouter(history),
  user,
  recipes,
});
