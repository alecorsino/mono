import { Observer, Subject } from 'rxjs';
import { IChannelMessage, IChannelStreamObserver } from '../channel';

export interface IModuleCoreApi {
    connect: (o: Observer<any>) => void;
}

export interface IModuleAPI {
    address: string;
    send: (msg: IChannelMessage) => void; // Subject<IChannelMessage>;
    // core: IModuleCoreApi;
    on: (observer: IChannelStreamObserver) => void;
    shutDown: () => void;
}

export interface IRegisteredModule {
    api: IModuleAPI;
    coreToModulePassThrough: Subject<IChannelMessage>;
    moduleToCoreChannel: Subject<IChannelMessage>;
}
