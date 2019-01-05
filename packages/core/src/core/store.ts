import createNextState from 'immer';
import { createStore, Store } from 'redux';

// @ts-ignore
// import { configureStore } from 'redux-starter-kit';

/**
 * Not Official Redux store type api
 */
// interface IReduxStore {
//     dispatch: (...args: any) => any;
//     getState: (...args: any) => any;
//     replaceReducer: (...args: any) => any;
//     subscribe: (...args: any) => any;
// }

export interface IApplicationStoreConfiguration {
    rootReducer: any; // Object<string, Function> | Function,
    // An array of Redux middlewares.  If not supplied, defaults to just redux-thunk.
    middleware?: any; // Array<MiddlewareFunction>,
    // Built-in support for devtools. Defaults to true.
    devTools?: boolean;
    // Same as current createStore.
    preloadedState?: any; // State,
    // Same as current createStore.
    // enhancer : ReduxStoreEnhancer,
}

/**
 * Redux actions to be used by a Reducer
 */
interface IStoreAction {
    type: string;
    payload: any;
}

export function configureStore(config: IApplicationStoreConfiguration) {
    return createStore(config.rootReducer, config.preloadedState);
    // return configureStore();
}

/**
 * Object dictionary that maps keys = IStoreAction.type to a reducer function
 * i.e.
 * actionMap = {
 *  TODO_LIST : todoReducer
 * }
 * and sending and action to the store like:
 * action = {type: 'TODO_LIST', payload:'something'}
 * will run the right reducer.
 *
 */
export interface IActionsMap {
    [key: string]: (state: any, action: any) => void;
}

/**
 * Redux store combined reducer that given:
 *  current state and action returns a new state
 */
export type RootReducerFunction = (state: any, action: any) => any;

/**
 * Combines all reducer to handle Application state changes
 * redux-starter-kit ripoff
 * USES immerjs to handle direct immutability
 * @param initialState
 * @param actionsMap plain object where keys are reducer functions.
 */
export function createRootReducer(initialState: any, actionsMap: IActionsMap): RootReducerFunction {
    return function rootReducer(state = initialState, action: IStoreAction) {
        return createNextState(state, draft => {
            const caseReducer = actionsMap[action.type];

            if (caseReducer) {
                return caseReducer(draft, action);
            }

            return draft;
        });
    };
}
