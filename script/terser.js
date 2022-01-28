import { minify } from 'html-minifier-terser';
import fs from 'fs';

const config = {
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
};

const getAllHTMLFiles = (dir) =>
    fs.readdirSync(dir).flatMap((file) => {
        const path = `${dir}/${file}`;
        if (fs.statSync(path).isDirectory()) {
            return getAllHTMLFiles(path);
        }
        const extension = path.split('.').pop();
        return extension ? (extension === 'html' ? [path] : []) : [];
    });

const readCode = (files) =>
    new Promise((resolve, reject) => {
        let fetchData = '';
        fs.createReadStream(files)
            .on('data', (data) => {
                fetchData = data.toString();
            })
            .on('end', () => resolve(fetchData))
            .on('error', reject);
    });

const getAllHTMLCodes = (files) =>
    files.map(async (file) => ({
        file,
        code: await readCode(file),
    }));

const main = async (dir) => {
    const files = getAllHTMLFiles(dir);
    if (files.length === 0) {
        console.log('No HTML file in build folder');
        process.exit(0);
    }
    (
        await getAllHTMLCodes(files).reduce(
            async (prev, curr) => (await prev).concat(await curr),
            Promise.resolve([])
        )
    ).forEach(async ({ code, file }) => {
        const minified = await minify(code, config);
        fs.writeFile(file, minified, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
    console.log('Frontend HTML Terser done its job!');
};

main('build');
