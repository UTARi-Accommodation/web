type UniversalEmptyMessage = {
    readonly error: '';
};
const isBlankString = (string: string) =>
    string.split('').filter((char) => ' ' === char).length === string.length;
const isEmptyString = (string: string) => string === '';
const hasSufficientLength = (string: string, length: number) =>
    string.length >= length;
const hasSymbol = (string: string) => /\W/gim.test(string);

export type PasswordInput = {
    readonly value: string;
    readonly error:
        | 'Please do not leave password section blank'
        | 'Please do not leave password section empty'
        | 'Please ensure that password contains at least 6 characters'
        | 'Please ensure that password contains at least one uppercase'
        | 'Please ensure that password contains at least one number'
        | 'Please ensure that password contains at least one symbol'
        | UniversalEmptyMessage['error'];
};

type Password = {
    readonly type: 'password';
    readonly name: 'password';
    readonly placeHolder: 'Password';
} & PasswordInput;

const getPasswordError = (password: string): PasswordInput['error'] => {
    const upperCaseRegex = /[A-Z]/;
    const integerRegex = /\d+/i;
    if (isEmptyString(password)) {
        return 'Please do not leave password section empty';
    }
    if (isBlankString(password)) {
        return 'Please do not leave password section blank';
    }
    if (!hasSufficientLength(password, 6)) {
        return 'Please ensure that password contains at least 6 characters';
    }
    if (!upperCaseRegex.test(password)) {
        return 'Please ensure that password contains at least one uppercase';
    }
    if (!integerRegex.test(password)) {
        return 'Please ensure that password contains at least one number';
    }
    if (!hasSymbol(password)) {
        return 'Please ensure that password contains at least one symbol';
    }
    return '';
};

export const getPasswordInput = (value: string): PasswordInput => ({
    value,
    error: getPasswordError(value),
});

export type ConfirmPasswordInput = {
    readonly value: string;
    readonly error:
        | 'Please do not leave confirm password section blank'
        | 'Please do not leave confirm password section empty'
        | 'Both passwords are not the same'
        | UniversalEmptyMessage['error'];
};

type ConfirmPassword = {
    readonly type: 'password';
    readonly name: 'confirmPassword';
    readonly placeHolder: 'Confirm Password';
} & ConfirmPasswordInput;

const getConfirmPasswordError = ({
    password,
    confirmPassword,
}: {
    readonly password: string;
    readonly confirmPassword: string;
}): ConfirmPasswordInput['error'] => {
    if (isEmptyString(confirmPassword)) {
        return 'Please do not leave confirm password section empty';
    }
    if (isBlankString(confirmPassword)) {
        return 'Please do not leave confirm password section blank';
    }
    if (confirmPassword === password) {
        return '';
    }
    return 'Both passwords are not the same';
};

export const getConfirmPasswordInput = ({
    password,
    confirmPassword,
}: {
    readonly password: string;
    readonly confirmPassword: string;
}): ConfirmPasswordInput => ({
    value: confirmPassword,
    error: getConfirmPasswordError({
        password,
        confirmPassword,
    }),
});

export type ContactInput = {
    readonly value: string;
    readonly error:
        | 'Please do not leave contact section blank'
        | 'Please do not leave contact section empty'
        | 'Please enter a valid email format'
        | 'Email address already taken'
        | 'Please enter a valid mobile number format'
        | 'Mobile number already taken'
        | UniversalEmptyMessage['error'];
};

export type ContactType = 'email' | 'text';

type Contact = {
    readonly type: ContactType;
    readonly name: 'emailOrMobileNumber';
    readonly placeHolder: 'Email or Mobile number';
} & ContactInput;

const getContactError = ({
    contact,
    type,
}: {
    readonly contact: string;
    readonly type: ContactType;
}): ContactInput['error'] => {
    if (isEmptyString(contact)) {
        return 'Please do not leave contact section empty';
    }
    if (isBlankString(contact)) {
        return 'Please do not leave contact section blank';
    }
    switch (type) {
        case 'text':
            return /^([+]?)(6?)(01)[02-33-9]([-]?|[\s]?)[0-9]{3}([-]?|[\s]?)[0-9]{4}$/i.test(
                contact
            ) || /^([+]?)(6?)(011)(([-]?|[\s]?)[0-9]{4}){2}$/i.test(contact)
                ? ''
                : 'Please enter a valid mobile number format';

        case 'email':
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                contact
            )
                ? ''
                : 'Please enter a valid email format';
    }
};

export const getContactInput = ({
    contact,
    type,
}: {
    readonly contact: string;
    readonly type: ContactType;
}): ContactInput => ({
    value: contact,
    error: getContactError({
        contact,
        type,
    }),
});

export const getContactType = (value: string): ContactType =>
    /^[+]?[\d + -]+$/i.test(value) ? 'text' : 'email';

export type NameInput = {
    readonly value: string;
    readonly error:
        | 'Please do not leave username section blank'
        | 'Please do not leave username section empty'
        | 'Please ensure that username have at least 6 characters'
        | 'Please ensure that username do not have symbols'
        | UniversalEmptyMessage['error'];
};

type Name = {
    readonly type: 'text';
    readonly name: 'name';
    readonly placeHolder: 'Username';
} & NameInput;

const getNameError = (name: string): NameInput['error'] => {
    if (isEmptyString(name)) {
        return 'Please do not leave username section empty';
    }
    if (isBlankString(name)) {
        return 'Please do not leave username section blank';
    }
    if (hasSymbol(name)) {
        return 'Please ensure that username do not have symbols';
    }
    if (!hasSufficientLength(name, 6)) {
        return 'Please ensure that username have at least 6 characters';
    }
    return '';
};

export const getNameInput = (value: string): NameInput => ({
    value,
    error: getNameError(value),
});

type InputType = Password | ConfirmPassword | Contact | Name;

export const signUpAllValueValid = (
    { value: name, error: nameErr }: NameInput,
    { value: contact, error: contactErr }: ContactInput,
    { value: password, error: passwordErr }: PasswordInput,
    { value: confirmPassword, error: confirmPasswordErr }: ConfirmPasswordInput,
    type: ContactType
): boolean => {
    const hasNoError =
        isEmptyString(nameErr) &&
        isEmptyString(contactErr) &&
        isEmptyString(passwordErr) &&
        isEmptyString(confirmPasswordErr);

    const isAllValueValid =
        isEmptyString(getNameError(name)) &&
        isEmptyString(getContactError({ contact, type })) &&
        isEmptyString(getPasswordError(password)) &&
        isEmptyString(getConfirmPasswordError({ password, confirmPassword }));

    return hasNoError && isAllValueValid;
};

export const loginAllValueValid = (
    { value: contact, error: contactErr }: ContactInput,
    { value: password, error: passwordErr }: PasswordInput,
    type: ContactType
) => {
    const hasNoError = isEmptyString(contactErr) && isEmptyString(passwordErr);

    const isAllValueValid =
        isEmptyString(getContactError({ contact, type })) &&
        isEmptyString(getPasswordError(password));

    return hasNoError && isAllValueValid;
};

export const recoveryAllValueValid = (
    { value: contact, error: contactErr }: ContactInput,
    type: ContactType
) => {
    const hasNoError = isEmptyString(contactErr);

    const isAllValueValid = isEmptyString(getContactError({ contact, type }));

    return hasNoError && isAllValueValid;
};

export default InputType;
