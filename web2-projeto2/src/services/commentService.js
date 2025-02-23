import prisma from "../prisma/client.js";
import {NotFoundError, AuthorizationError} from "../utils/errors.js";

// Criar um comentário
export const createComment = async (data) => {
  return await prisma.comment.create({ data });
};

// Obter comentários por ID do post
export const getCommentsByPostId = async (postId) => {
  return await prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};


// Atualizar um comentário
export const updateComment = async (id, data, userId) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new NotFoundError("Comentário não encontrado");
  }

  if (comment.userId !== userId) {
    throw new AuthorizationError("Você não tem permissão para atualizar este comentário");
  }

  return await prisma.comment.update({
    where: { id },
    data,
  });
};

// Deletar um comentário
export const deleteComment = async (id, userId) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new NotFoundError("Comentário não encontrado");
  }

  if (comment.userId !== userId) {
    throw new AuthorizationError("Você não tem permissão para deletar este comentário");
  }

  return await prisma.comment.delete({ where: { id } });
};