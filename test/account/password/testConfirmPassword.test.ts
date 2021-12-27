import { getConfirmPasswordInput } from '../../../src/util/account/validation';

describe('Test Password Validation', () => {
    test.each([
        {
            input: {
                password: 'Abcdef123!@#',
                confirmPassword: '',
            },
            error: 'Please do not leave confirm password section empty',
        },
        {
            input: {
                password: 'Abcdef123!@#',
                confirmPassword: 'Abcdef123!@#',
            },
            error: '',
        },
        {
            input: {
                password: 'Abcdef123!@#',
                confirmPassword: 'Abcdef123',
            },
            error: 'Both passwords are not the same',
        },
    ])('data => %p', (data) => {
        expect(getConfirmPasswordInput(data.input)).toEqual({
            value: data.input.confirmPassword,
            error: data.error,
        });
    });
});
