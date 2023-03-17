function computeTime(req,res,next) {
    const start = Date.now();
    res.on('finish', () => {
        const end = Date.now();
        const duration = end - start;
        console.log(`Response time: ${duration} ms`);
    });
    next();
}

function getInformations(req,res,next) {
    console.log("Your request method is: " + req.method);
    console.log("Your Hostname is: " + req.hostname);
    console.log("Your url is: " + req.path);
    next()
}

module.exports = {
    computeTime,
    getInformations
}