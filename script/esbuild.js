import esbuild from 'esbuild';
import dotenv from 'dotenv';

const { parsed } = dotenv.config({});

const config = {
    PUBLIC_URL: parsed.PUBLIC_URL,
    NODE_ENV: parsed.NODE_ENV,
    API: parsed.API,
    MAPS_API_KEY: parsed.MAPS_API_KEY,

    FIREBASE_API_KEY: parsed.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: parsed.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: parsed.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: parsed.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: parsed.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: parsed.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: parsed.FIREBASE_MEASUREMENT_ID,
};

(async () => {
    try {
        const build = await esbuild.build({
            entryPoints: ['src/index.tsx'],
            outfile: 'build/index.js',
            loader: {
                '.ts': 'tsx',
                '.png': 'binary',
            },
            bundle: true,
            minify: true,
            platform: 'browser',
            define: {
                'process.env.NODE_ENV': `"${config.NODE_ENV}"`,
                'process.env.PUBLIC_URL': `"${config.PUBLIC_URL}"`,
                'process.env.API': `"${config.API}"`,
                'process.env.MAPS_API_KEY': `"${config.MAPS_API_KEY}"`,

                'process.env.FIREBASE_API_KEY': `"${config.FIREBASE_API_KEY}"`,
                'process.env.FIREBASE_AUTH_DOMAIN': `"${config.FIREBASE_AUTH_DOMAIN}"`,
                'process.env.FIREBASE_PROJECT_ID': `"${config.FIREBASE_PROJECT_ID}"`,
                'process.env.FIREBASE_STORAGE_BUCKET': `"${config.FIREBASE_STORAGE_BUCKET}"`,
                'process.env.FIREBASE_MESSAGING_SENDER_ID': `"${config.FIREBASE_MESSAGING_SENDER_ID}"`,
                'process.env.FIREBASE_APP_ID': `"${config.FIREBASE_APP_ID}"`,
                'process.env.FIREBASE_MEASUREMENT_ID': `"${config.FIREBASE_MEASUREMENT_ID}"`,
            },
            logLevel: 'silent',
            banner: {
                js: '(() => new EventSource("/esbuild").onmessage = () => location.reload())();',
            },
            watch: {
                onRebuild: (error, result) => {
                    console.log(error ?? result);
                },
            },
        });
        console.dir(build);
        console.log('Build succeeded.');
    } catch (error) {
        console.log('Error building:', error.message);
        process.exit(1);
    }
})();
