import { getAllFiles } from './util.js';
import { build } from 'esbuild';

const buildTest = (entryPoint) =>
    build({
        entryPoints: [entryPoint],
        outfile: `__tests__/${entryPoint
            .replace('test/', '')
            .replace('.ts', '.js')}`,
        bundle: true,
        minify: true,
        minifyWhitespace: true,
        platform: 'node',
        logLevel: 'silent',
        target: 'node16.13.1',
    }).catch((e) => {
        console.log('Error building:', e.message);
        process.exit(1);
    });
(async (dir) => {
    const files = getAllFiles(dir, (extension) => extension === 'ts');
    if (files.length === 0) {
        console.log(`No test file in ${dir} folder`);
        process.exit(0);
    }
    await Promise.all(files.map(buildTest));
})('test');
