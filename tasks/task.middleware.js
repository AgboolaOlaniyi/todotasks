const joi = require("joi")
const validateTask = (req, res, next) => {
    try {
        const taskSchema = joi.object({
            task_name: joi.string()
                .empty().
                required()
                .messages({
                    "string.base": `"task_name" must be of type "text"`,
                    "string.empty": `"task_name" can not be empty`,
                    "string.required": `"task_name" is required`
                }),

            state: joi
                .string()
                .empty()
                .required()
                .min(8)
                .messages({
                    "string.base": `"state" must be of type "text"`,
                    "string.empty": `"state" can not be empty`,
                    "string.required": `"state" is required`
                    

                }),

           
                 });

        taskSchema.validateAsync(req.body, { abortEarly: true })

        next()
    } catch (err) {
        res.status(402).json({
            message: "invalid information",
            error: err.message
        })
    }
};

    module.exports = {validateTask}