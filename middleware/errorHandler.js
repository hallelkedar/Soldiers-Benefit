export default (err, req, res, next) => {
    console.error(err.stack)
    if (err.statusCode) {
        res.status(err.statusCode).json({success: false, message: err.message})
    } else {
        res.status(500).json({success: false, message: 'Intenal server error'})
    }
    return next()
}