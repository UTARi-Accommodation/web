import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { parseAsEnv } from 'esbuild-env-parsing';

const app = initializeApp({
    apiKey: parseAsEnv({
        env: process.env.FIREBASE_API_KEY,
        name: 'firebase api key',
    }),
    authDomain: parseAsEnv({
        env: process.env.FIREBASE_AUTH_DOMAIN,
        name: 'firebase auth domain',
    }),
    projectId: parseAsEnv({
        env: process.env.FIREBASE_PROJECT_ID,
        name: 'firebase project Id',
    }),
    storageBucket: parseAsEnv({
        env: process.env.FIREBASE_STORAGE_BUCKET,
        name: 'firebase storage bucket',
    }),
    messagingSenderId: parseAsEnv({
        env: process.env.FIREBASE_MESSAGING_SENDER_ID,
        name: 'firebase messaging sender Id',
    }),
    appId: parseAsEnv({
        env: process.env.FIREBASE_APP_ID,
        name: 'firebase app Id',
    }),
    measurementId: parseAsEnv({
        env: process.env.FIREBASE_MEASUREMENT_ID,
        name: 'firebase measurement Id',
    }),
});
const analytics = getAnalytics(app);

export { app, analytics };
