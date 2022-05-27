import { GranulaString } from 'granula-string';
import {
    parseAsCustomType,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import { Data, Email, Message, Name } from '../../../common/src/contact';

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

const parseAsInfo = (info: unknown) =>
    parseAsReadonlyObject(info, (info) => ({
        value: GranulaString.createFromString(
            parseAsString(info.value).orElseThrowDefault('value')
        ),
        error: parseAsString(info.error).orElseThrowDefault('error'),
    })).orElseThrowDefault(`info: ${info}`);

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
        ).orElseThrowDefault(`name: ${name}`),
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
        ).orElseThrowDefault(`email: ${email}`),
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
        ).orElseThrowDefault(`message: ${message}`),
    };
};

export default parseAsData;
