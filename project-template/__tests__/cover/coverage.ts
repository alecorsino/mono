import { coverageTest } from '../../src/cover/coverage';

test('Function that doesn return a value but needs to be test for Coverage', () => {
    expect(coverageTest(false)).toBeUndefined();
});
