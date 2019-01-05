import { MonoTypeOperatorFunction, OperatorFunction, Subject, UnaryFunction } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IChannelMessage } from './types';

export function createChannel(): Subject<IChannelMessage> {
    return new Subject<IChannelMessage>();
}

/**
 * Logic to INTERCEPT all Core incoming messages
 * We could:
 * 'tap' to create side effect like loggins system wide
 * trasnform messages with 'map' or any other rxjs operators
 * TODO: DON"T KNOW IF WE ARE GOING TO NEED THIS
 */
// export type RxOperatorFunction<T, R> = OperatorFunction<T, R> | MonoTypeOperatorFunction<T>;
// export type RxOperatorFunction<T, R> = OperatorFunction<T, R> | OperatorFunction<T, T>;
// export type RxChannelPipeFunctions<T, R> = [RxOperatorFunction<T, R>];
export type RxChannelPipeFunctions<T, R> = Array<UnaryFunction<T, R>>;

export function createModuleToCoreChannel(
    chPipeFns: RxChannelPipeFunctions<any, any> | undefined
): Subject<IChannelMessage> {
    let coreChannel = createChannel();

    if (chPipeFns && chPipeFns.length > 0) {
        // Need to cast to 'any' becuase spreading array into pipe has TS know errors:
        // https://github.com/ReactiveX/rxjs/issues/4279
        coreChannel = (coreChannel as any).pipe(...chPipeFns);
    }
    return coreChannel; // as Subject<IChannelMessage>;
}
