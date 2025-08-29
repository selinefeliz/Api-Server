//archivo de respuestas ante errores y exitos
exports.success = function (req, res, message= '', status=200) {
    res.status(status).send({
        error: false,
        status: status,
        body: message,
    });
};


exports.error = function (req, res, message = 'Error interno', statusCode = 500) {
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: message,
    });
};
