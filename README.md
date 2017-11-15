# Learning Async Functions

`async/await` is a new Javascript (ECMAScript) feature available natively on 

* Node, since version 7.
* All evergreen browsers: Chrome, Firefox, Edge, Opera.

## Introduction

The purpose of async/await functions is to simplify how we write asynchronous code in JavaScript. 

* It improves code readability by making asynchronous code behave almost like synchronous code.

It's not a replacement of Promises, but an extension of it.
It's built on Promises, so a good understanding of Promises is required.

As Promises, the async functions are non-blocking.

## References:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://developers.google.com/web/fundamentals/primers/async-functions
- https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9
- https://ponyfoo.com/articles/understanding-javascript-async-await
- https://medium.com/@reasoncode/javascript-es8-introducing-async-await-functions-7a471ec7de8a

## The async function

Prepending a function with `async` makes the function return a Promise.
It also clearly indicates that that function performs asynchronous operations.

```javascript
async function foo(bar){
    // return a Promise that will eventually provide a return value
}
```

## The await keyword

The `await` keyword allows to **suspend** a script execution until a Promise is fullfilled (resolve or rejected).


```javascript
async function foo(bar);

async function foo(bar){
    const x = await foo(1);
    const y = await foo(2);
    const z = await foo(3);

    return x + y + z;
}
```

**IMPORTANT**: you can only use `await` inside an `async` function. 


## Error handling

When using `Promises`, you must handle all errors using `catch` blocks.

When using `await` inside an `async` function, you can use synchronous `try/catch` to handle errors when needed. Any error encountered inside an async function will cause the Promise to be rejected.

However, the top-level `async` function must use a `catch` block to handle errors.

Alternatively, on Node, you can listen to the unhandled reject event. But in any case, you **must** handle errors yourself.

```javascript
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

async function foo(){
    // throw an error
};

foo();
```

More about unhandled promise rejections in Node: http://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html.

## Executing async functions in parallel

Do not confuse await for **Promise.all** or **Promise.race**. async/await has no support for parallel execution, so you'll still need promises for that.

```javascript
async function p1();
async function p2();
async function p3();

async function foo(bar){

    console.log('running p1,p2 and p3 in parallel');

    await Promise.all([
        p1(),
        p2(),
        p3()
    ]);

    console.log('All promises above are resolved here');

}
```

## Node util.promisify

Takes a function following the common Node.js callback style, i.e. taking a (err, value) => ... callback as the last argument, and returns a version that returns promises.

```javascript
// using promisify
const readFile = promisify(fs.unlink);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
```

**IMPORTANT**: Take note that your callback must comply with standard NodeJS convention or it won't work.