import axios, { Method } from 'axios';
import { parseAsEnv } from 'esbuild-env-parsing';

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

const utariAxios = (() => ({
    ...axios,
    get: (url: string) => createInstance('get').get(url),
    delete: async (url: string, headers?: Readonly<Record<string, any>>) =>
        await createInstance('delete').delete(url, {
            headers,
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
            headers,
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
            headers,
        }),
}))();

export default utariAxios;
