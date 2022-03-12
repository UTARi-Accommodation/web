import axios from 'axios';

const config = {
    headers: {
        'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
} as const;

const utariAxios = {
    ...axios,
    get: (url: string) => axios.get(url, config),
    delete: (url: string) => axios.delete(url, config),
    put: (url: string, data?: any) => axios.put(url, data, config),
    post: (url: string, data?: any, additionalConfig?: any) =>
        axios.post(url, data, { ...config, ...additionalConfig }),
} as const;

export default utariAxios;
