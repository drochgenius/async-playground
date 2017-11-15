
console.info(`
# The async keyword makes any function return a Promise
`);

// synchronous function
function sum1(x, y) {
    return x + y;
}

// asynchronous version
async function sum2(x, y) {
    return x + y;
}


//console.log('synchronous sum1:', sum1(2, 3));
//console.log('asynchronous sum2:', sum2(2, 3));

// You can use then(...) on any async function 
//sum2(2, 3).then(result => console.log('[sum2] promise resolved with result:', result));




function sumAfter2Seconds(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x + y), 2000);
    }); 
}

async function main(){
    console.log('waiting for 2 seconds');
    const sum = await sumAfter2Seconds(9, 6);
    console.log('HEY', sum);
}

main();

/**
 * Semantically, the async function clearly identify what's asynchronous in your code
 */