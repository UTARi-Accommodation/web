module.exports = {
    ignoreURLParametersMatching: [/^source$/],
    globDirectory: './',
    globPatterns: ['build/*.{html,ico}'],
    globIgnores: [
        'node_modules/**/*',
        '{.,_}*/**/*',
        '**/*.{md,txt}',
        'Gemfile*',
        'package*',
    ],
    runtimeCaching: [
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
                },
            },
        },
        {
            urlPattern: /\.(?:css|js)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'assets',
            },
        },
    ],
    swDest: 'build/service-worker.js',
    sourcemap: false,
};
