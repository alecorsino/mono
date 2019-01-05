/**
 * CORE/SYSTEM MESSAGE TYPES
 *
 */
export const TEST_MESSAGES = Object.freeze({
    /** TO DISPATCH ACTIONS TO STORE THAT MODIFIES APP STATE: SHOULD BE USED IN "meta" prop of a message */
    STATE_ACTION: 'STATE_ACTION',
    /** CORE DISPATCH TO MODULES THAT MODIFIES APP STATE */
    STATE_CHANGED: 'STATE_CHANGED',
});
export enum CORE_MESSAGES {
    STATE_ACTION = 'STATE_ACTION',
    STATE_CHANGED = 'STATE_CHANGED',
}
/**
 * Encapsulates a task to be run in the future
 * Run Task thunk
 */
export type RunTaskFunction = (...args: any) => void;

/**
 * API  returned by the Core when an App is created.
 * Implementation details:
 * async bootstrap() - After bootstrapping the core it creates a microtask to be run after all modules are listening
 * bradcast(msg:) - send messages to all
 * getState() - gets App state
 */
export interface IApplication {
    /** async bootstrap() - After bootstrapping the core it creates a microtask to be run after all modules are listening */
    bootstrap: (task: RunTaskFunction) => void;
    /**  bradcast(msg:) - send messages to all */
    broadcast: (msg: any) => void;
    /**  getState() - gets App state */
    getState: () => any;
}
