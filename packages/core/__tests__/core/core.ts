import { tap } from 'rxjs/operators';
import { IChannelMessage } from '../../src/channel';
import { CORE_MESSAGES, createApp, createRootReducer, IApplication } from '../../src/core';
import { registerModule } from '../../src/module';

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

/**
 * State
 * Store setup
 */
const initState = {
    test_number: 0,
    test_string: '',
};

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
// beforeAll(() => {});

test('It should create and returns an IApplication API', () => {
    const APP = createApp(rootReducer, loggerMsgProcessor, [op1, op2]);

    expect(typeof APP.bootstrap).toBe('function');
    expect(typeof APP.broadcast).toBe('function');
    expect(typeof APP.getState).toBe('function');
});

test('It should create an App with a State store configured', () => {
    const APP = createApp(rootReducer, loggerMsgProcessor, [op1, op2]);

    APP.bootstrap(() => {
        // console.log();
    });
    const currentState = APP.getState();
    const testState = {
        ...initState,
        // test: 'test',
    };
    expect(currentState).toEqual(testState);
});

test('Core/App should broadcast a message to registered Module', () => {
    const APP = createApp(rootReducer, loggerMsgProcessor, [op1, op2]);
    const msg1Broadcast = { type: 'TEST_MSG', payload: 'TEST_PAYLOAD 1' };
    // JESt and TS_JEST ISSUE WITH ENUMS --- CORE_MESSAGES.STATE_CHANGED DOES NOT WORK
    const msg2Broadcast = { type: CORE_MESSAGES.STATE_CHANGED, payload: 'TEST_PAYLOAD 2', meta: 'STATE' };
    // const msg2Broadcast = { type: 'STATE_CHANGED', payload: 'TEST_PAYLOAD 2', meta: 'STATE' };
    const myMod = registerModule('MyTestMod');

    // Module setup
    const mockOnNext = jest.fn(msg => console.log(msg));
    const onObs = {
        complete: undefined,
        error: undefined,
        next: mockOnNext,
    };
    myMod.on(onObs);

    APP.bootstrap(() => {
        APP.broadcast(msg1Broadcast); // First broadcast
        APP.broadcast(msg2Broadcast); // Second broadcast
    });

    return Promise.resolve().then(() => {
        expect(mockOnNext.mock.calls.length).toBe(2);
        // First broadcast
        expect(mockOnNext.mock.calls[0][0]).toEqual({ ...msg1Broadcast });

        // Second broadcast
        expect(mockOnNext.mock.calls[1][0]).toEqual({ ...msg2Broadcast });
    });
});
