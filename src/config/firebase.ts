import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { parseAsString } from 'parse-dont-validate';

const parseAsNonNullableString = (text: string | undefined) =>
    parseAsString(text).orElseThrowDefault('text');

const app = initializeApp({
    apiKey: parseAsNonNullableString(process.env.FIREBASE_API_KEY),
    authDomain: parseAsNonNullableString(process.env.FIREBASE_AUTH_DOMAIN),
    projectId: parseAsNonNullableString(process.env.FIREBASE_PROJECT_ID),
    storageBucket: parseAsNonNullableString(
        process.env.FIREBASE_STORAGE_BUCKET
    ),
    messagingSenderId: parseAsNonNullableString(
        process.env.FIREBASE_MESSAGING_SENDER_ID
    ),
    appId: parseAsNonNullableString(process.env.FIREBASE_APP_ID),
    measurementId: parseAsNonNullableString(
        process.env.FIREBASE_MEASUREMENT_ID
    ),
});
const analytics = getAnalytics(app);

export { app, analytics };
