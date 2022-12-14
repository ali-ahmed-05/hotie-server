import ErrorHandler from "../utils/ErrorHandler.js";

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV.toUpperCase() === "DEVELOPMENT") {
        console.log(err);

        res.status(err.statusCode).json({
            success: false,
            errMessage: err.message,
            error: err,
            stack: err.stack,
        });
    }

    if (process.env.NODE_ENV.toUpperCase() === "PRODUCTION") {
        let error = { ...err };

        error.message = err.message;

        // Wrong Mongoose Object ID Error
        if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose Validation Error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map((value) => value.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose duplicate key errors
        if (err.code === 11000) {
            // const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            const message = `${Object.keys(
                err.keyValue
            )} Already  Taken  with value :  ${Object.values(err.keyValue)} `;

            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT error
        if (err.name === "JsonWebTokenError") {
            const message = "JSON Web Token is invalid. Try Again!!!";
            error = new ErrorHandler(message, 400);
        }

        // Handling Expired JWT error
        if (err.name === "TokenExpiredError") {
            const message = "JSON Web Token is expired. Try Again!!!";
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
