import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import rootReducer from '../reducers/reducers';

import { persistStore } from "redux-persist";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { store, persistor };

