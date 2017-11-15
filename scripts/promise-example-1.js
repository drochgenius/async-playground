const fs = require('fs');
const { zipEpub, unzipEpub } = require('@hmh/epub-archiver');

function init() {
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


init()
    .then(() => unzipEpub('data/foo.epub', 'data/temp'))
    .then(result => {
        console.log('EPUB UNZIPPED', result);
        updateFile('data/temp/index.html');
    })
    .then(() => zipEpub('data/temp', 'data/bar.epub'))
    .then(() => {
        console.log('SUCCESS')
    })
    .catch(error => {
        console.error('ERROR', error);
    });