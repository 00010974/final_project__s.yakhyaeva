const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server Error"

    //wrong mongoodb id error
    if(err.name === "CastError"){
        const message = `Resources not found whith this id.. Invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // duplicate key error
    if(err.code === 11000){
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    //wrong jwt error
    if (err.name ==="JsonWebTokenError"){
        const message = `Your url is invalid please try again later`
        err = new ErrorHandler(message,400);
    }

    //jwt expired
    if (err.name === "TokenExpiredError"){
        const message = `Your Url is expired please try again later`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}