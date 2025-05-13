const errorHandler = (err, req, res, next) => {
    console.log(err);
    const message = err.message || "Server Error";
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: message,
        method: req.method,
        url: req.url,
    });
}

export default errorHandler;