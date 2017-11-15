const fs = require('fs');
const { zipEpub, unzipEpub } = require('@hmh/epub-archiver');

async function init() {
    return new Promise((resolve, reject) => {
        const file = 'data/bar.epub';
        fs.access(file, fs.constants.R_OK, err => {
            if (err) resolve();

            fs.unlink(file, err => {
                if (err) reject(err);

                resolve();
            })
        });
    });
}

function updateFile(filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const newContent = content + ' more text';
    fs.writeFileSync(filename, newContent, 'utf8');
}

async function main() {
    await init();

    // unzip my epub
    const result = await unzipEpub('data/foo.epub', 'data/temp');
    console.log('EPUB UNZIPPED', result);
    // update the file
    updateFile('data/temp/index.html');
    // rezip my epub
    await zipEpub('data/temp', 'data/bar.epub');

    console.log('SUCCESS');
}

main()
    .then(() => console.log('DONE!'));
