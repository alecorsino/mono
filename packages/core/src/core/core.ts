import { curry } from 'ramda';
import { Store } from 'redux';
import { tap } from 'rxjs/operators';
import { ChannelStream, IChannelMessage } from '../channel';
import { createChannel, createModuleToCoreChannel, RxChannelPipeFunctions } from '../channel/channel';
import { CORE_STATE } from './core_state';
import { configureStore, IApplicationStoreConfiguration, RootReducerFunction } from './store';
import { CORE_MESSAGES, IApplication, RunTaskFunction } from './types';

type IMessageProcessor = (msg: IChannelMessage) => void;

const MESSAGE_PROCESSORS: IMessageProcessor[] = [];
/**
 *
 * @param moduleToCoreChannel
 * @param coreToModuleChannel
 * @returns { IApplication }
 *
 */
function appApiFactory(moduleToCoreChannel: ChannelStream, coreToModuleChannel: ChannelStream): IApplication {
    return {
        async bootstrap(task: RunTaskFunction) {
            if (!CORE_STATE.INITIALIZED) {
                console.log('[BOOTING UP CORE]');
                // bootstrapModules(coreConnection);
                // CORE <- MODULES  COMMUNCATION. // SHOULD WE ALLOW TO CREATE SEPRATE CHANNELS PER MODULES?
                CORE_STATE.setInChannelStream(moduleToCoreChannel);
                // CORE -> MODULES  COMMUNCATION
                CORE_STATE.setOutChannelStream(coreToModuleChannel);
                CORE_STATE.INITIALIZED = true;
            }

            // Schedule a Microtask after Core is bootstrapped
            Promise.resolve().then(() => task(CORE_STATE.getApplication()));
        },
        broadcast(msg) {
            coreToModuleChannel.next(msg);
        },
        getState() {
            return CORE_STATE.getApplicationStore().getState();
        },
    };
}

// const stateChangeBroadcast = curry((channel, msg) => channel.next(msg));
/**
 * Creates main App
 * an App is the external API of the core
 * TODO: make sure only one app is running
 */
export function createApp(
    rootReducer: RootReducerFunction,
    msgProcessors: IMessageProcessor,
    coreChPipeFunctions?: RxChannelPipeFunctions<any, any>
): IApplication {
    if (!CORE_STATE.INITIALIZED) {
        console.info('[CREATING NEW APPLICATION]');
        const moduleToCoreChannel = createModuleToCoreChannel(coreChPipeFunctions);
        const coreToModuleChannel = createChannel();
        CORE_STATE.setApplication(appApiFactory(moduleToCoreChannel, coreToModuleChannel));

        // App State Store
        const STORE = configureStore({ rootReducer });
        CORE_STATE.setApplicationStore(STORE);
        STORE.subscribe(() =>
            coreToModuleChannel.next({ type: CORE_MESSAGES.STATE_CHANGED, payload: STORE.getState() })
        );
        moduleToCoreChannel.subscribe(createCoreMessageHandler(msgProcessors, STORE));
    }

    return CORE_STATE.getApplication();
    // Combine processors TODO MAYBE USE function composition
    // MESSAGE_PROCESSORS.concat(...processors);
}

/**
 * TODO: IT SHOULD HAVE CORE LOGIC TO HANDLE MESSAGES
 * COMING FROM MODULES
 *
 * CORE LOGIC COULD BE INTERCEPTED WITHIN STREAM PIPE.
 * see channel/createModuleToCoreChannel
 *
 */
function createCoreMessageHandler(msgProcessors: IMessageProcessor, store: Store<any, any>) {
    return {
        next(msg: IChannelMessage) {
            console.info(`[CORE: MESSAGE RECIEVED]`, msg);
            // Handle State action
            if (msg.meta && msg.meta === CORE_MESSAGES.STATE_ACTION) {
                console.log('[CORE-STATE]', msg);
                store.dispatch(msg);
            }
            msgProcessors(msg);
        },
        error(m: IChannelMessage) {
            console.error(`[CORE: - ERROR]`, m);
        },
        complete() {
            console.info(` [CORE: STREAM COMPLETED]`);
        },
    };
}

/**
 * TODO:
 * I THINK ADDING ANOTHER SUBJECT AND CONNECT IT
 * TO MODULE CHANNEL WOULD BE ABLE TO USE RXJS PIPING INSTEAD OF DOING THE BELOW
 * @param msg
 */
function processMessage(msg: IChannelMessage) {
    for (const mp of MESSAGE_PROCESSORS) {
        mp(msg);
    }
}
