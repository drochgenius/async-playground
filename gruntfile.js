async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = function (grunt) {

    grunt.registerTask('foo', function () {
        const done = this.async();
        console.log('waiting for 3 seconds...');
        delay(3000)
            .then(done)
            .catch(err => done(err));
    });


    grunt.registerTask('default', ['foo']);

};

