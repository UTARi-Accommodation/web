import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { parseAsString } from 'parse-dont-validate';

const parseAsStringEnv = ({
    env,
    name,
}: Readonly<{
    env: unknown;
    name: string;
}>) => parseAsString(env).elseThrow(`${name} is not string`);

const app = initializeApp({
    apiKey: parseAsStringEnv({
        env: process.env.FIREBASE_API_KEY,
        name: 'FIREBASE_API_KEY',
    }),
    authDomain: parseAsStringEnv({
        env: process.env.FIREBASE_AUTH_DOMAIN,
        name: 'FIREBASE_AUTH_DOMAIN',
    }),
    projectId: parseAsStringEnv({
        env: process.env.FIREBASE_PROJECT_ID,
        name: 'FIREBASE_PROJECT_ID',
    }),
    storageBucket: parseAsStringEnv({
        env: process.env.FIREBASE_STORAGE_BUCKET,
        name: 'FIREBASE_STORAGE_BUCKET',
    }),
    messagingSenderId: parseAsStringEnv({
        env: process.env.FIREBASE_MESSAGING_SENDER_ID,
        name: 'FIREBASE_MESSAGING_SENDER_ID',
    }),
    appId: parseAsStringEnv({
        env: process.env.FIREBASE_APP_ID,
        name: 'FIREBASE_APP_ID',
    }),
    measurementId: parseAsStringEnv({
        env: process.env.FIREBASE_MEASUREMENT_ID,
        name: 'FIREBASE_MEASUREMENT_ID',
    }),
});
const analytics = getAnalytics(app);

export { app, analytics };
