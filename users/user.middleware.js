const joi = require("joi")
const validateUser = (req, res, next) => {
    try {
        const userSchema = joi.object({
            username: joi.string()
                .empty()
                .required()
                .messages({
                    "string.base": `"username" must be of type "text"`,
                    "string.empty": `"username" can not be empty`,
                    "string.required": `"username" is required`
                }),

            password: joi
                .string()
                .empty()
                .required()
                .min(8)
                .messages({
                    "string.base": `"password" must be of type "text"`,
                    "string.empty": `"password" can not be empty`,
                    "string.required": `"password" is required`,
                    "string.min": `"password" should have a minimum of {8}`,

                }),

      
                 });

        userSchema.validateAsync(req.body, { abortEarly: true })

        next()
    } catch (err) {
        res.status(402).json({
            message: "invalid information",
            error: err.message
        })
    }
};




    module.exports = {validateUser}

