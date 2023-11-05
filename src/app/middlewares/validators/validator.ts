const validator = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.unknown(true).validate(req)
        if (validationResult.error)
            return res
                .status(400)
                .send(validationResult.error.message)
        next()
    }
}
export default validator