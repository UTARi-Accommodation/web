import { build } from 'esbuild';
import dotenv from 'dotenv';
import { parseAsEnvs, parseAsEnv } from 'esbuild-env-parsing';

dotenv.config({});

(() =>
    build({
        entryPoints: ['src/index.tsx'],
        outfile: 'build/index.js',
        loader: {
            '.ts': 'tsx',
            '.png': 'binary',
        },
        bundle: true,
        minify: true,
        minifyWhitespace: true,
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
        logLevel: 'silent',
        watch:
            parseAsEnv({
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
        }))();
