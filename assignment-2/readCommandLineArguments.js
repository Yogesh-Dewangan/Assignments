function readCommandLineArguments() {
    const name = process.argv.slice(2).join(" ");
    console.log(`Hello ${name}`)
}

readCommandLineArguments();