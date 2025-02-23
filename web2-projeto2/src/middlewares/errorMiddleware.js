// src/middlewares/errorMiddleware.js
import { Prisma } from "@prisma/client";
import { RiseError } from "../utils/errors.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erros do Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Conflito: entrada duplicada." });
    }
  }

  // Erros personalizados
  if (err instanceof RiseError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Erro genérico
  res.status(500).json({ error: "Erro interno do servidor." });
};