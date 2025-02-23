const Joi = require("joi");

const reservaSchema = Joi.object({
  checkIn: Joi.date().iso().required().messages({
    "date.base": "A data de check-in deve estar no formato ISO 8601.",
    "any.required": "A data de check-in é obrigatória."
  }),
  checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required().messages({
    "date.base": "A data de check-out deve estar no formato ISO 8601.",
    "date.greater": "A data de check-out deve ser posterior ao check-in.",
    "any.required": "A data de check-out é obrigatória."
  }),
  clienteId: Joi.number().integer().positive().required().messages({
    "number.base": "O ID do cliente deve ser um número inteiro.",
    "any.required": "O ID do cliente é obrigatório."
  }),
  quartoId: Joi.number().integer().positive().required().messages({
    "number.base": "O ID do quarto deve ser um número inteiro.",
    "any.required": "O ID do quarto é obrigatório."
  }),
  hospedes: Joi.array().items(
    Joi.object({
      nome: Joi.string().min(3).max(50).required().messages({
        "string.empty": "O nome do hóspede é obrigatório.",
        "string.min": "O nome do hóspede deve ter pelo menos 3 caracteres.",
        "string.max": "O nome do hóspede deve ter no máximo 50 caracteres."
      })
    })
  ).max(3).required().messages({
    "array.max": "Um quarto pode ter no máximo 3 hóspedes.",
    "any.required": "A lista de hóspedes é obrigatória."
  })
});

module.exports = reservaSchema;