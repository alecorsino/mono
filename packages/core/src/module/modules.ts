import { from, Observer, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChannelStream, createChannel, IChannelMessage, IChannelStreamObserver } from '../channel';
import { CORE_STATE } from '../core/core_state';
import { IModuleAPI } from '../module';
/**
 * Register a module into the Core
 * Registered modules are NOT bootrstrapped until the Core is Bootstrapped
 * It creates a communication channell to send messages to the core and returns
 * an API to dispatch/send messages to the Core and register multiple obsersvers of messages from the core.
 *
 * TODO: INIT  NEW MODULE AFTER APP STARTED
 * TOD:  KEEP TRACK OF MODULES!!!!
 * @param address name
 */
// export async function registerModule(address: string): Promise<IModule> {
export function registerModule(address: string): IModuleAPI {
    const coreToModuleChannel = createChannel();

    // API Module <-> Core
    const moduleAPI = moduleApiFActory(address, coreToModuleChannel);
    return moduleAPI;
}

function moduleApiFActory(address: string, coreToModuleChannel: ChannelStream): IModuleAPI {
    return {
        address,
        send(msg: IChannelMessage) {
            CORE_STATE.getInChannelStream().next(msg);
            // moduleToCoreChannel.next(msg);
        },
        async on(observer: IChannelStreamObserver): Promise<void> {
            const outChannel = await CORE_STATE.getOutChannelStream();
            outChannel.subscribe(observer);
        },
        shutDown() {
            shutDownModule(CORE_STATE.MODULES.length);
        },
    };
}

/**
 * Shutdowns module and its channels
 * comunicate obervers about completion of the stream
 * Remove from registerd modules
 * TODO : NOT TESTED
 * @param i
 */
function shutDownModule(i: number) {
    const module = CORE_STATE.MODULES[i];
    module.api.shutDown();
    CORE_STATE.removeModule(i);
}

// function bootstrapNewModule(module: IRegisteredModule) {}
/**
 * Bootstrap all registered Module and connects Cora main public channel to Module Observers
 * inderectily through a bridge observer.
 * @param coreChannel Core
 */
// export function bootstrapModules(coreConnection: any) {
//     from(CORE_STATE.MODULES)
//         .pipe(
//             tap((M: IRegisteredModule) => {
//                 // Core -> Module
//                 coreConnection.coreChannel.subscribe(M.coreToModulePassThrough);

//                 // Module -> Core
//                 M.moduleToCoreChannel.subscribe(coreConnection.createCoreEntryPoint(M.api.address));
//             })
//         )
//         .subscribe(
//             (M: IRegisteredModule) => {
//                 console.log(`${M.api.address} STARTED`);
//             },
//             (M: IRegisteredModule) => {
//                 console.log(`${M.api.address} ERROR`);
//             },
//             () => {
//                 console.log(`ALL MODULES STARTED`);
//             }
//         );
// }

/**
 * a Web Wroker Module ...
 */
export function registerWebWorkerModule(webworker: Worker) {
    // const w = new Worker(urls|blob)
    //
    // w.postMessage(MSG);
    // w.onmessage = function(e) {
    //     result.textContent = e.data;
    //     console.log('Message received from worker');
    //   }
    //
    // *** webworker file ***
    // onmessage = function(e) {
    //     console.log('Message received from main script');
    //      DO WORK
    //      DO WORK
    //      DO WORK
    //     postMessage(workerResult); ///send result
    // };
}
