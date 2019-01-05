import { createApp, createRootReducer, IApplication, IChannelMessage, registerModule } from '@brainglitch/core';
import { tap } from 'rxjs/operators';
import './MyModule';

const loggerPipe = (msg: any) => {
    switch (msg.type) {
        case 'LOGGER_PIPE':
            console.log('[LOGGER_PIPE - THE CORE RECIEVED A MSG]', msg);
            break;

        default:
            break;
    }
};
const loggerMsgProcessor = (msg: any) => {
    switch (msg.type) {
        case 'LOGGER_PROC':
            console.log('[LOGGER_PROC - THE CORE RECIEVED A MSG]', msg);
            break;

        default:
            break;
    }
};

const op1 = tap((msg: IChannelMessage) => {
    console.log('[INTERCEPTED]', msg);
});
const op2 = tap(loggerPipe);

const initState = {
    counter: 0,
    name: '',
};

/**
 * State
 */

function counterReducer(state: any, action: any) {
    console.log('[ACTION]', action.type);
    console.log('[PAYLOAD]', action.payload);
    state.counter++;
}
function nameReducer(state: any, action: any) {
    console.log('[ACTION]', action.type);
    console.log('[PREV state]', state);
    state.name = action.payload;
}
const rootReducer = createRootReducer(initState, { COUNTER: counterReducer, NAME: nameReducer });

const app = createApp(rootReducer, loggerMsgProcessor, [op1, op2]);
app.bootstrap(() => {
    app.broadcast({
        payload: 'BRAODCAST!!',
        type: 'CORE_BROADCAST',
    });
    console.log('[APP STATE]', app.getState());
});
