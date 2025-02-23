const Joi = require("joi");

const clienteSchema = Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve ter pelo menos 3 caracteres.",
    "string.max": "O nome deve ter no máximo 50 caracteres."
  }),
  email: Joi.string().email().required().messages({
    "string.email": "O e-mail deve ser válido.",
    "string.empty": "O e-mail é obrigatório."
  }),
  telefone: Joi.string().pattern(/^\(\d{2}\) \d{5}-\d{4}$/).required().messages({
    "string.pattern.base": "O telefone deve estar no formato (XX) XXXXX-XXXX.",
    "string.empty": "O telefone é obrigatório."
  })
});

module.exports = clienteSchema;
