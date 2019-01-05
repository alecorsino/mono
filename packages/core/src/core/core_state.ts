import { Store } from 'redux';
import { ChannelStream, IChannelMessage } from '../channel';
import { IRegisteredModule } from '../module/types';
import { IApplication } from './types';

/**
 * Represents the APP RUNNING CORE STATE
 * ONLY CAN BE ONE APP CREATED/RUNNING
 * NOTE: THIS FILE SHOULD NOT IMPORT OTHER MODULES
 * UNLESS THEY ARE ONLY INTERFACES.
 *
 * IT SHOULD NOT HAVE ANY BEHEVIOUR EXCEPTS THAT IMMUTABLE UPDATES TO A NEW STATE
 */

let INITIALIZED = false;
let MODULES: IRegisteredModule[] = [];
// let APP_STATE: any;
let inChannelStream: ChannelStream;

let outChannelStream: ChannelStream;
/**
 * Setting channel will resolve a  promise that make registering
 * Module ON observer async.
 * The below exposes resolving a promise from outside
 */
let resolveOutChannelStreamPromise: (value?: ChannelStream) => void;
const outChannelStreamPromise = new Promise<ChannelStream>(resolve => {
    resolveOutChannelStreamPromise = resolve;
});

let Application: IApplication;
let APPLICATION_STORE: Store<any, any>;

export const CORE_STATE = {
    setApplicationStore(store: any) {
        if (INITIALIZED) {
            throw Error('Cannot set Application after app has been initialized');
        }
        APPLICATION_STORE = store;
    },

    getApplicationStore() {
        return APPLICATION_STORE;
    },
    setApplication(app: IApplication) {
        if (INITIALIZED) {
            throw Error('Cannot set Application after app has been initialized');
        }
        Application = app;
    },

    getApplication() {
        return Object.freeze(Application);
    },

    getInChannelStream() {
        return inChannelStream;
    },

    setInChannelStream(channel: ChannelStream) {
        if (INITIALIZED) {
            throw Error('Cannot set core channel after app has been initialized');
        }
        inChannelStream = channel;
    },

    async getOutChannelStream() {
        return outChannelStreamPromise;
    },

    setOutChannelStream(channel: ChannelStream) {
        if (INITIALIZED) {
            throw Error('Cannot set core channel after app has been initialized');
        }
        outChannelStream = channel;
        // We resolve setting the module on observer to make it async
        resolveOutChannelStreamPromise(outChannelStream);
    },

    set INITIALIZED(value: any) {
        INITIALIZED = true;
    },
    get INITIALIZED() {
        return INITIALIZED;
    },

    get MODULES() {
        return MODULES;
    },

    removeModule(index: number) {
        MODULES = MODULES.filter((v, i) => {
            return i !== index;
        });
    },

    initNewModule(module: IRegisteredModule) {
        console.log();
    },
};
