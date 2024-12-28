

exports.responseBody = (status, data, message, error) => {
    return {
        status,
        data,
        message,
        error
    }
}