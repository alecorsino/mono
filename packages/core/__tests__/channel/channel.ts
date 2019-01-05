import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { createModuleToCoreChannel, IChannelMessage } from '../../src/channel';

test('Channel: It should create a Rxjs Subject<IChannelMessage>', () => {
    const msgChType = 'CHANNEL';
    const msgUntouchedType = 'MSG_UNTOUCHED';

    // const msgCh = { type: msgChType, payload: 'TEST_PAYLOAD 2', meta: 'STATE' };
    const msgCh = { type: msgChType, payload: 'TEST_PAYLOAD 2' };
    const msgChModified = { type: msgChType + '_MODIFIED', payload: 'MODIFIED MSG' };
    const msgUntouched = { type: msgUntouchedType, payload: 'TEST_PAYLOAD' };

    const swmap = switchMap((msg: IChannelMessage) => (msg.type === msgChType ? of(msgChModified) : of(msg)));
    const ch = createModuleToCoreChannel([swmap]);
    const nextMock = jest.fn(msg => msg);
    ch.subscribe(nextMock);
    ch.next(msgCh);
    ch.next(msgUntouched);
    expect(nextMock.mock.calls.length).toBe(2);
    expect(nextMock.mock.calls[0][0]).toEqual({ ...msgChModified });
    expect(nextMock.mock.calls[1][0]).toEqual({ ...msgUntouched });
});
