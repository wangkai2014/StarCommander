import * as R from "ramda";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import throttle from "lodash.throttle";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { ApplicationState, reducers, sagas } from ".";

const getStateFromSessionStore = () => {
	try {
		const retrievedState = sessionStorage.getItem("reduxStore");
		if (retrievedState === null) {
			return null;
		}
		return JSON.parse(retrievedState);
	} catch (err) {
		return null;
	}
};

export default function configureStore(
	history: History,
	initialState?: ApplicationState
) {
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [sagaMiddleware, routerMiddleware(history)];

	const rootReducer = combineReducers({
		...reducers,
		router: connectRouter(history)
	});

	const enhancers = [];
	const windowIfDefined =
		typeof window === "undefined" ? null : (window as any);
	if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
		enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
	}

	const isDevelopment = process.env.NODE_ENV === "development";

	if (isDevelopment) {
		var savedState = getStateFromSessionStore();
		if (savedState !== null) {
			initialState = savedState;
		}
	}

	const store = createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(...middleware), ...enhancers)
	);

	if (isDevelopment) {
		store.subscribe(
			throttle(() => {
				try {
					sessionStorage["reduxStore"] = JSON.stringify(
						store.getState()
					);
				} catch {
					// ignore write errors
				}
			}, 1000)
		);
	}

	R.forEach(saga => sagaMiddleware.run(saga), R.values(sagas));

	return store;
}
