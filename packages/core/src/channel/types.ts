import { from, Observer, Subject } from 'rxjs';
/**
 * System wide Message
 */
export interface IChannelMessage {
    type: string;
    payload: any;
    meta?: any;
}
export type ChannelStream = Subject<IChannelMessage>;

export interface IChannelStreamObserver {
    next(msg: IChannelMessage): void;
    error(msg: IChannelMessage): void;
    complete(): void;
}
