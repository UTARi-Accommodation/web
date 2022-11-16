import { GranulaString } from 'granula-string';
import parseAsData from '../../../src/parser/contact';
import { describe, it, expect } from 'vitest';

const testContactParser = () =>
    describe('Contact POST Data Parser', () => {
        it('should parse POST Data as type of succeed', () => {
            const succeed = {
                type: 'succeed',
                name: {
                    value: '',
                    error: '',
                },
                email: {
                    value: '',
                    error: '',
                },
                message: {
                    value: '',
                    error: '',
                },
            };
            expect(parseAsData(succeed)).toStrictEqual({
                ...succeed,
                name: {
                    ...succeed.name,
                    value: GranulaString.createFromString(''),
                },
                email: {
                    ...succeed.email,
                    value: GranulaString.createFromString(''),
                },
                message: {
                    ...succeed.message,
                    value: GranulaString.createFromString(''),
                },
            });
        });
        describe('parse POST Data as type of input', () => {
            it('should parse when name is faulty', () => {
                const input = {
                    type: 'input',
                    name: {
                        value: '',
                        error: '*Please do not leave name section empty*',
                    },
                    email: {
                        value: 'brucewayne@gmail.com',
                        error: '',
                    },
                    message: {
                        value: 'testing purpose',
                        error: '',
                    },
                };
                expect(parseAsData(input)).toStrictEqual({
                    ...input,
                    name: {
                        ...input.name,
                        value: GranulaString.createFromString(input.name.value),
                    },
                    email: {
                        ...input.email,
                        value: GranulaString.createFromString(
                            input.email.value
                        ),
                    },
                    message: {
                        ...input.message,
                        value: GranulaString.createFromString(
                            input.message.value
                        ),
                    },
                });
            });
            it('should parse when email is faulty', () => {
                const input = {
                    type: 'input',
                    name: {
                        value: 'Bruce',
                        error: '',
                    },
                    email: {
                        value: 'brucewayne@gmail.com',
                        error: '*Please enter valid email format*',
                    },
                    message: {
                        value: 'testing purpose',
                        error: '',
                    },
                };
                expect(parseAsData(input)).toStrictEqual({
                    ...input,
                    name: {
                        ...input.name,
                        value: GranulaString.createFromString(input.name.value),
                    },
                    email: {
                        ...input.email,
                        value: GranulaString.createFromString(
                            input.email.value
                        ),
                    },
                    message: {
                        ...input.message,
                        value: GranulaString.createFromString(
                            input.message.value
                        ),
                    },
                });
            });
            it('should parse when message is faulty', () => {
                const input = {
                    type: 'input',
                    name: {
                        value: 'Bruce',
                        error: '',
                    },
                    email: {
                        value: 'brucewayne@gmail.com',
                        error: '',
                    },
                    message: {
                        value: '',
                        error: '*Please do not leave message section empty*',
                    },
                };
                expect(parseAsData(input)).toStrictEqual({
                    ...input,
                    name: {
                        ...input.name,
                        value: GranulaString.createFromString(input.name.value),
                    },
                    email: {
                        ...input.email,
                        value: GranulaString.createFromString(
                            input.email.value
                        ),
                    },
                    message: {
                        ...input.message,
                        value: GranulaString.createFromString(
                            input.message.value
                        ),
                    },
                });
            });
        });
        it('should parse type of failed', () => {
            const failed = {
                type: 'failed',
                error: 'testing purpose',
            };
            expect(parseAsData(failed)).toStrictEqual(failed);
        });
    });

export default testContactParser;
