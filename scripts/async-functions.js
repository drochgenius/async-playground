
console.info(`
# The async keyword makes any function return a Promise
`);

// normal function
function sum1(x, y) {
    return x + y;
}

// asynchronous version
async function sum2(x, y) {
    return x + y;
}


console.log('synchronous sum:', sum1(2, 3));
console.log('asynchronous sum:', sum2(2, 3));

// You can use then(...) on any async function 
sum2(2, 3).then(result => console.log('promise resolved with result:', result));


async function sumAfter2Seconds(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x + y), 2000);
    });
}

console.log('delayed sum', sumAfter2Seconds(4, 6));

/**
 * Semantically, the async function clearly identify what's asynchronous in your code
 */