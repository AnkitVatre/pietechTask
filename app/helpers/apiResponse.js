exports.successResponse = (res, msg) => {
    let data = {
        status:true,
        message:msg
    }
    return res.status(200).json(data)
}

exports.successResponseWithData = (res, msg, resData) => {
    let data = {
        status:true,
        message:msg,
        data:resData
    }
    return res.status(200).json(data)
}
exports.errorResponse = (res, msg) => {
    let data = {
        status:false,
        message:msg
    }
    return res.status(500).json(data)
}
exports.unauthorizedResponse = (res, msg) => {
    let data = {
        status:false,
        message:msg
    }
    return res.status(401).json(data)
}
exports.notFoundResponse = (res, msg) => {
    let data = {
        status:false,
        message:msg
    }
    return res.status(404).json(data)
}

exports.validationErrorWithData = (res, msg, resData) => {
    let data = {
        status:true,
        message:msg,
        data:resData
    }
    return res.status(406).json(data)
}
exports.forbiddenAccess = (res, msg) => {
    let data = {
        status:false,
        message:msg
    }
    return res.status(403).json(data)
}
exports.invalidImage = (res, msg) => {
    let data = {
        status:false,
        message:msg
    }
    return res.status(422).json(data)
}