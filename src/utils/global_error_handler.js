module.exports.globalErrorHandler = (err, req, res, next) => {
    const { message = "something went wrong", status = 500, stack } = err;
    return res.json({ message: message, status, stack })
}