import { getContactType } from '../../../src/util/account/validation';

describe('Test Categorize as Text Contact Validation', () => {
    test.each([
        {
            value: '+60',
        },
        {
            value: '60',
        },
        {
            value: '0',
        },
        {
            value: '-',
        },
    ])('data => %p', (data) => {
        expect(getContactType(data.value)).toEqual('text');
    });
});

describe('Test Categorize as Email Contact Validation', () => {
    test.each([
        {
            value: 'ger',
        },
        {
            value: 'bruceWayne',
        },
    ])('data => %p', (data) => {
        expect(getContactType(data.value)).toEqual('email');
    });
});
