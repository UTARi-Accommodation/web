import { getNameInput } from '../../../src/util/account/validation';

describe('Test Name Validation', () => {
    test.each([
        {
            value: ' ',
            error: 'Please do not leave username section blank',
        },
        {
            value: '',
            error: 'Please do not leave username section empty',
        },
        {
            value: 'BruceWayne!#',
            error: 'Please ensure that username do not have symbols',
        },
        {
            value: 'Bruce',
            error: 'Please ensure that username have at least 6 characters',
        },
        {
            value: 'BruceWayne',
            error: '',
        },
    ])('data => %p', (data) => {
        expect(getNameInput(data.value)).toEqual(data);
    });
});
