import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ChildrenReducer } from "./ChildrenReducer";

const persistConfig = {
    key: "root",
    storage,
    //   whitelist: ["user"],
};

const rootReducer = combineReducers({
    children: ChildrenReducer
});

export default persistReducer(persistConfig, rootReducer);
