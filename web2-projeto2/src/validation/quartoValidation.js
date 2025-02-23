const Joi = require("joi");

const quartoSchema = Joi.object({
  numero: Joi.number().integer().min(1).required().messages({
    "number.base": "O número do quarto deve ser um número inteiro.",
    "number.min": "O número do quarto deve ser maior que 0.",
    "any.required": "O número do quarto é obrigatório."
  }),
  tipo: Joi.string().valid("Solteiro", "Casal", "Duplo", "Luxo").required().messages({
    "any.only": "O tipo do quarto deve ser 'Solteiro', 'Casal', 'Duplo' ou 'Luxo'.",
    "any.required": "O tipo do quarto é obrigatório."
  }),
  preco: Joi.number().precision(2).positive().required().messages({
    "number.base": "O preço deve ser um número válido.",
    "number.positive": "O preço deve ser um valor positivo.",
    "any.required": "O preço é obrigatório."
  }),
  disponivel: Joi.boolean().default(true)
});

module.exports = quartoSchema;