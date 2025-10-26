import { combineReducers } from "redux";
import reducerCalculator from "./reducerCalculator";
import reducerMyspace from "./reducerMyspace";

const rootReducer = combineReducers({
    reducerCalculator,
    reducerMyspace,
})

export default rootReducer;