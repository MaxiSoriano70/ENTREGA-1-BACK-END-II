import sum from "./sum.helper.js";

process.on("message", (message) => {
    const result = sum();
    process.send(result);
});
