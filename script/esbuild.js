import esbuild from 'esbuild';
import dotenv from 'dotenv';

dotenv.config({});

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
                'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
                'process.env.PUBLIC_URL': `"${process.env.PUBLIC_URL}"`,
                'process.env.API': `"${process.env.API}"`,
                'process.env.MAPS_API_KEY': `"${process.env.MAPS_API_KEY}"`,

                'process.env.FIREBASE_API_KEY': `"${process.env.FIREBASE_API_KEY}"`,
                'process.env.FIREBASE_AUTH_DOMAIN': `"${process.env.FIREBASE_AUTH_DOMAIN}"`,
                'process.env.FIREBASE_PROJECT_ID': `"${process.env.FIREBASE_PROJECT_ID}"`,
                'process.env.FIREBASE_STORAGE_BUCKET': `"${process.env.FIREBASE_STORAGE_BUCKET}"`,
                'process.env.FIREBASE_MESSAGING_SENDER_ID': `"${process.env.FIREBASE_MESSAGING_SENDER_ID}"`,
                'process.env.FIREBASE_APP_ID': `"${process.env.FIREBASE_APP_ID}"`,
                'process.env.FIREBASE_MEASUREMENT_ID': `"${process.env.FIREBASE_MEASUREMENT_ID}"`,
            },
            logLevel: 'silent',
            banner: {
                js: '(() => new EventSource("/esbuild").onmessage = () => location.reload())();',
            },
            watch:
                process.env.NODE_ENV !== 'DEVELOPMENT'
                    ? undefined
                    : {
                          onRebuild: (error, result) =>
                              console.log(error ?? result),
                      },
        });
        console.dir(build);
        console.log('Build succeeded.');
    } catch (error) {
        console.log('Error building:', error.message);
        process.exit(1);
    }
})();
