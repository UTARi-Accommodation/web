import {
    getContactInput,
    getContactType,
} from '../../../src/util/account/validation';

describe('Test Contact General Validation', () => {
    test.each([
        {
            value: ' ',
            error: 'Please do not leave contact section blank',
        },
        {
            value: '',
            error: 'Please do not leave contact section empty',
        },
    ])('data => %p', (data) => {
        expect(
            getContactInput({
                contact: data.value,
                type: 'text',
            })
        ).toEqual(data);
    });
});

describe('Test Mobile Number start from 011 Validation', () => {
    test.each([
        {
            value: '01155484654',
        },
        {
            value: '011-55484654',
        },
        {
            value: '6011-55484654',
        },
        {
            value: '+6011-55484654',
        },
        {
            value: '+6011-5548-4654',
        },
        {
            value: '+6011 5548 4654',
        },
    ])('data => %p', (data) => {
        expect(
            getContactInput({
                contact: data.value,
                type: 'text',
            })
        ).toEqual({
            value: data.value,
            error: '',
        });
    });
});

describe('Test Mobile Number not start from 011 Validation', () => {
    test.each([
        {
            value: '0123456789',
        },
        {
            value: '012-3456789',
        },
        {
            value: '6012-3456789',
        },
        {
            value: '+6012-3456789',
        },
        {
            value: '+6012-345-6789',
        },
        {
            value: '+6012 345 6789',
        },
    ])('data => %p', (data) => {
        expect(
            getContactInput({
                contact: data.value,
                type: 'text',
            })
        ).toEqual({
            value: data.value,
            error: '',
        });
    });
});

describe('Test Mobile Number not start from 011 Validation', () => {
    test.each([
        {
            value: 'brucewayne@gmail.com',
        },
        {
            value: 'brucewayne@outlook.com',
        },
        {
            value: 'brucewayne@1utar.my',
        },
    ])('data => %p', (data) => {
        expect(
            getContactInput({
                contact: data.value,
                type: 'email',
            })
        ).toEqual({
            value: data.value,
            error: '',
        });
    });
});
