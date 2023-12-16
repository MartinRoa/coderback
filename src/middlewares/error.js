import EErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case EErrors.NEW_PRODUCT_DATA_INCOMPLETE:
            res.status(409).json({
                status: "error", error: error.name});
            break;
        default:
            res.status(409).json({status: "error", error: "Unhandled error."})
    }
}