import { GranulaString } from 'granula-string';
import {
    parseAsCustomType,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import { Data, Email, Message, Name } from 'utari-common';

const parseAsData = (data: any): Data => {
    const type = parseAsCustomType<Data['type']>(
        data.type,
        (type) => type === 'succeed' || type === 'input' || type === 'failed'
    ).elseThrow(`type is not typeof type in Data, it is ${data.type}`);
    switch (type) {
        case 'failed': {
            const { error } = data;
            return {
                type,
                error: parseAsString(error).elseThrow(
                    `error is not a string, it is ${error}`
                ),
            };
        }
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
    }
};

const parseAsInfo = (info: unknown) =>
    parseAsReadonlyObject(info, (info) => ({
        value: GranulaString.createFromString(
            parseAsString(info.value).elseThrow(
                `value is not a string, it is ${info.value}`
            )
        ),
        error: parseAsString(info.error).elseThrow(
            `error is not a string, it is ${info.value}`
        ),
    })).elseThrow(`info is not an object, it is ${info}`);

const parseAsName = (name: unknown): Name => {
    const { value, error } = parseAsInfo(name);
    return {
        value,
        error: parseAsCustomType<Name['error']>(
            error,
            (error) =>
                error === '' ||
                error === '*Please do not leave name section empty*' ||
                error === '*Please do not leave name section blank*'
        ).elseThrow(`name is not Name object, it is ${name}`),
    };
};

const parseAsEmail = (email: unknown): Email => {
    const { value, error } = parseAsInfo(email);
    return {
        value,
        error: parseAsCustomType<Email['error']>(
            error,
            (error) =>
                error === '' ||
                error === '*Please do not leave email section empty*' ||
                error === '*Please do not leave email section blank*' ||
                error === '*Please enter valid email format*'
        ).elseThrow(`email is not an Email object, it is ${email}`),
    };
};

const parseAsMessage = (message: unknown): Message => {
    const { value, error } = parseAsInfo(message);
    return {
        value,
        error: parseAsCustomType<Message['error']>(
            error,
            (error) =>
                error === '' ||
                error === '*Please do not leave message section empty*' ||
                error === '*Please do not leave message section blank*' ||
                error === '*At least 10 words are required*'
        ).elseThrow(`message is Message object, it it ${message}`),
    };
};

export default parseAsData;
