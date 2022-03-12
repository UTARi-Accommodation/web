import { GranulaString } from 'granula-string';
import { parseAsCustomType, parseAsString } from 'parse-dont-validate';
import { Data, Email, Message, Name } from 'utari-common';

const parseAsData = (data: any): Data => {
    const type = parseAsCustomType<Data['type']>(
        data.type,
        (type) => type === 'succeed' || type === 'input' || type === 'failed'
    ).orElseThrowDefault('type');
    switch (type) {
        case 'input':
        case 'succeed': {
            const { message, email, name } = data;
            return {
                type,
                message: parseAsMessage(message),
                email: parseAsEmail(email),
                name: parseAsName(name),
            };
        }
        case 'failed': {
            const { error } = data;
            return {
                type,
                error: parseAsString(error).orElseThrowDefault('error'),
            };
        }
    }
};

const parseAsInfo = (info: any) => {
    const { value, error } = info;
    return {
        value: GranulaString.createFromString(
            parseAsString(value).orElseThrowDefault('value')
        ),
        error: parseAsString(error).orElseThrowDefault('error'),
    };
};

const parseAsName = (name: any): Name => {
    const { value, error } = parseAsInfo(name);
    switch (error) {
        case '':
        case '*Please do not leave name section empty*':
        case '*Please do not leave name section blank*':
            return {
                value,
                error,
            };
    }
    throw new Error(
        `name is not of type Name, it is ${JSON.stringify(name, null, 2)}`
    );
};

const parseAsEmail = (email: any): Email => {
    const { value, error } = parseAsInfo(email);
    switch (error) {
        case '':
        case '*Please do not leave email section empty*':
        case '*Please do not leave email section blank*':
        case '*Please enter valid email format*':
            return {
                value,
                error,
            };
    }
    throw new Error(
        `email is not of type Email, it is ${JSON.stringify(email, null, 2)}`
    );
};

const parseAsMessage = (message: any): Message => {
    const { value, error } = parseAsInfo(message);
    switch (error) {
        case '':
        case '*Please do not leave message section empty*':
        case '*Please do not leave message section blank*':
        case '*At least 10 words are required*':
            return {
                value,
                error,
            };
    }
    throw new Error(
        `email is not of type Email, it is ${JSON.stringify(message, null, 2)}`
    );
};

export default parseAsData;
