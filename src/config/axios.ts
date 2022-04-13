import axios, { Method } from 'axios';
import { parseAsString } from 'parse-dont-validate';
import { parseAsEnv } from 'esbuild-env-parsing';
import csrf from '../url/query/csrf';

const createInstance = (method: Method) =>
    axios.create({
        baseURL: `${parseAsEnv({
            env: process.env.API,
            name: 'api',
        })}/api`,
        headers: {
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        withCredentials: true,
        method,
    });

const utariAxios = (() => {
    const get = (url: string) => createInstance('get').get(url);
    const getCrsfToken = async () => {
        const { data } = await get(csrf);
        return parseAsString(data.csrfToken).orElseThrowDefault('csrfToken');
    };
    return {
        ...axios,
        get,
        delete: async (url: string, headers?: Readonly<Record<string, any>>) =>
            await createInstance('delete').delete(url, {
                headers: {
                    ...headers,
                    ['CSRF-Token']: await getCrsfToken(),
                },
            }),
        put: async (
            url: string,
            {
                headers,
                data,
            }: Readonly<{
                headers?: Readonly<Record<string, any>>;
                data?: any;
            }>
        ) =>
            await createInstance('put').put(url, data, {
                headers: {
                    ...headers,
                    ['CSRF-Token']: await getCrsfToken(),
                },
            }),
        post: async (
            url: string,
            {
                headers,
                data,
                additionalConfig,
            }: Readonly<{
                data: any;
                additionalConfig?: any;
                headers?: Readonly<Record<string, any>>;
            }>
        ) =>
            await createInstance('post').post(url, data, {
                ...additionalConfig,
                headers: {
                    ...headers,
                    ['CSRF-Token']: await getCrsfToken(),
                },
            }),
    } as const;
})();

export default utariAxios;
