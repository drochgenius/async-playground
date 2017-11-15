const fs = require('fs');
const { promisify } = require('util');
const { zipEpub, unzipEpub } = require('@hmh/epub-archiver');

// using promisify
const readFile = promisify(fs.unlink);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

process.on('unhandledRejection', error => {
    console.error('ERROR', error);
  });

async function init() {
    const file = 'data/bar.epub';

    // We can use try/catch like we do for synchronous code!
    try {
        await access(file, fs.constants.R_OK);

        // file exists
        await unlink(file);

    } catch (err) {
        console.log('FILE DOES NOT EXIST', file);
    }
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
    
    // invalid code
    stop.here();
    
    // rezip my epub
    await zipEpub('data/temp', 'data/bar.epub');

    console.log('SUCCESS');
}

main();
