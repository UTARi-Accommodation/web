import { defineConfig, loadEnv } from 'vite';
import React from '@vitejs/plugin-react';

const generateEnvs = (env: Record<string, string>) => {
    const keys = Object.keys(env);
    const nonNullableKeys = [
        'NODE_ENV',
        'PUBLIC_URL',
        'API',
        'MAPS_API_KEY',
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_STORAGE_BUCKET',
        'FIREBASE_MESSAGING_SENDER_ID',
        'FIREBASE_APP_ID',
        'FIREBASE_MEASUREMENT_ID',
    ];
    const absentKeys = nonNullableKeys.filter(
        (key) => !keys.find((envKey) => envKey.endsWith(key))
    );
    if (absentKeys.length) {
        throw new Error(`keys of ${absentKeys.join(', ')} is absent`);
    }
    return Object.entries(env).reduce(
        (prev, [key, value]) => ({
            ...prev,
            [`process.env.${key.replace('VITE_', '')}`]: JSON.stringify(value),
        }),
        {} as Record<string, string>
    );
};

export default defineConfig(({ mode }) => {
    const currentDir = process.cwd();

    const serveOptions = {
        port: 3000,
        open: true,
    };

    return {
        root: `${currentDir}/src`,
        plugins: [React()],
        server: serveOptions,
        preview: serveOptions,
        define: generateEnvs(loadEnv(mode, currentDir)),
        build: {
            manifest: true,
            minify: 'esbuild',
        },
    };
});
