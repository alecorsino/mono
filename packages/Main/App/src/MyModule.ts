import { CORE_MESSAGES, IChannelMessage, registerModule } from '@brainglitch/core';
import { curry } from 'ramda';

const Module1 = registerModule('MOD 1');
const Module2 = registerModule('MOD 2');

const msg: IChannelMessage = {
    payload: 'PAYLOAD!',
    type: '',
};

function createObserver(NAME: string) {
    return {
        next(m: any) {
            console.log(`[MOUDLE ${NAME} MSG FROM CORE]`, m);
        },
        error(m: any) {
            console.log(`[ERROR][MOUDLE ${NAME} MSG FROM CORE]`, m);
        },
        complete() {
            console.log(`[${NAME} COMPLETED]`);
        },
    };
}

Module1.on(createObserver('OBS 1'));
Module2.on(createObserver('OBS 2'));

const messageDispatcher = curry((meta: any, type: any, payload: any) => ({ meta, type, payload }));
const stateAction = messageDispatcher(CORE_MESSAGES.STATE_ACTION);
const nameAction = stateAction('NAME');

setInterval(() => {
    Module1.send({ payload: 'FROM MODLUES', type: 'STUPID_MSG' });
    Module2.send({ payload: 'FROM MODLUES again', type: 'LOGGER' });
    // State MSGs
    Module2.send({ type: 'COUNTER', payload: '', meta: CORE_MESSAGES.STATE_ACTION });
    Module2.send(nameAction('Ale!'));
}, 1000);
