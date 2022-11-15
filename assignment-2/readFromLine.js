const readLine = require('readline');

const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question('Give a name: ', ans => {
    console.log(`Hello ${ans}`);
    r1.close();
})