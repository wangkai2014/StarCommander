import * as acknowledgement from "./acknowledgement";
import * as auth from "./auth";
import * as ship from "./ship";

export interface ApplicationState {
	acknowledgement: acknowledgement.AcknowledgementState | undefined;
	auth: auth.AuthState | undefined;
	ship: ship.ShipState | undefined;
}

export const reducers = {
	acknowledgement: acknowledgement.reducer,
	auth: auth.reducer,
	ship: ship.reducer
};

export const sagas = {
	acknowledgement: acknowledgement.rootSaga,
	auth: auth.rootSaga,
	ship: ship.rootSaga
};

export interface Action {
	type: string;
	payload: object | undefined;
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
	(
		dispatch: (action: TAction) => void,
		getState: () => ApplicationState
	): void;
}
