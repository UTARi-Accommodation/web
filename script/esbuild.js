import { build } from 'esbuild';
import dotenv from 'dotenv';
import { parseAsEnvs, parseAsStringEnv } from 'esbuild-env-parsing';

const main = () => {
    dotenv.config({});
    build({
        entryPoints: ['src/index.tsx'],
        outfile: 'build/index.js',
        loader: {
            '.ts': 'tsx',
        },
        bundle: true,
        minify: true,
        sourcemap: process.env.NODE_ENV === 'development',
        platform: 'browser',
        define: parseAsEnvs([
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
        ]),
        logLevel: 'debug',
        watch:
            parseAsStringEnv({
                env: process.env.NODE_ENV,
                name: 'node env',
            }) !== 'development'
                ? undefined
                : {
                      onRebuild: (error, result) =>
                          console.log(error ?? result),
                  },
    })
        .then((r) => {
            console.dir(r);
            console.log('Build succeeded.');
        })
        .catch((e) => {
            console.log('Error building:', e.message);
            process.exit(1);
        });
};

main();
