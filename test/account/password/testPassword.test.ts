import { getPasswordInput } from '../../../src/util/account/validation';

describe('Test Password Validation', () => {
    test.each([
        {
            value: ' ',
            error: 'Please do not leave password section blank',
        },
        {
            value: '',
            error: 'Please do not leave password section empty',
        },
        {
            value: 'abcde',
            error: 'Please ensure that password contains at least 6 characters',
        },
        {
            value: 'abcdef',
            error: 'Please ensure that password contains at least one uppercase',
        },
        {
            value: 'Abcdef',
            error: 'Please ensure that password contains at least one number',
        },
        {
            value: 'Abcdef123',
            error: 'Please ensure that password contains at least one symbol',
        },
        {
            value: 'Abcdef123!@#',
            error: '',
        },
    ])('data => %p', (data) => {
        expect(getPasswordInput(data.value)).toEqual(data);
    });
});
