import prisma from "../prisma/client.js";
import {NotFoundError, AuthorizationError} from "../utils/errors.js";

// Criar um usuário
export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

// Obter um usuário por ID
export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};

// Atualizar um usuário
export const updateUser = async (id, data, userId) => {
    // Verifica se o post pertence ao usuário logado
    const user = await prisma.user.findUnique({
      where: { id },
    });
  
    if (!user) {
      throw new NotFoundError("Usuario não encontrado");
    }
  
    if (id !== userId) {
      throw new AuthorizationError("Você não tem permissão para editar esse usuario");
    }
  
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// Deletar um usuário
export const deleteUser = async (id, userId) => {
  // Verifica se o post pertence ao usuário logado
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundError("Usuario não encontrado");
  }

  if (id !== userId) {
    throw new AuthorizationError("Você não tem permissão para deletar este usuario");
  }

  return await prisma.user.delete({ where: { id } });
};

// Obter todos os usuários
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};