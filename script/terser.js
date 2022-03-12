import { minify } from 'html-minifier-terser';
import fs from 'fs';
import { getAllFilesAndCode, getAllFiles } from './util.js';

const config = {
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
};

(async (dir) => {
    const files = getAllFiles(dir, (extension) => extension === 'html');
    if (files.length === 0) {
        console.log('No HTML file in build folder');
        process.exit(0);
    }
    await Promise.all(
        (
            await getAllFilesAndCode(files).reduce(
                async (prev, curr) => (await prev).concat(await curr),
                Promise.resolve([])
            )
        ).map(async ({ code, file }) =>
            fs.writeFile(file, await minify(code, config), (err) => {
                if (err) {
                    console.error(err);
                }
            })
        )
    );
    console.log('Frontend HTML Terser done its job!');
})('build');
