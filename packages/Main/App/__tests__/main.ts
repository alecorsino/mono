import { TestMe } from '../src/main';

test('It should Decorate a String wtih 😎', () => {
    expect(TestMe('Hola')).toMatch(`😎 Hola 😎`);
});
