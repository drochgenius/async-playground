const gulp = require('gulp');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

gulp.task('foo', async () => {
    console.log('waiting for 3 seconds...');
    await delay(3000);
});

gulp.task('bar', ['foo'], async () => {
    console.log('waiting for 2 more seconds...');
    await delay(2000);
});

gulp.task('default', ['bar']);