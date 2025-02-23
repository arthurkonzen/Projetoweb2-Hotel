import prisma from "../prisma/client.js";
import {NotFoundError, AuthorizationError} from "../utils/errors.js";

// Criar um post
export const createPost = async (data, userId) => {
  return await prisma.post.create({ data });
};

// Obter todos os posts de maneira paginada através de parâmetros Prisma
export const getAllPosts = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  // Total de itens
  const totalItems = await prisma.post.count();

  // Posts paginados com exclusão de campos sensíveis
  const posts = await prisma.post.findMany({
    skip: offset,
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true, // Inclua apenas os campos necessários
        },
      },
      comments: true, // Relacionamento com comentários
    },
  });

  return {
    posts,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
    pageSize: limit,
  };
};

// Obter posts por ID do usuário
export const getPostsByUserId = async (userId) => {
  return await prisma.post.findMany({
    where: { userId },
    include: { user: true, comments: true },
  });
};

// Obter posts por ID
export const getPostsById = async (id) => {
  return await prisma.post.findMany({
    where: { id },
    include: { user: true, comments: true },
  });
};

// Atualizar um post com verificação de propriedade
export const updatePost = async (id, userId, data) => {
  // Verifica se o post pertence ao usuário logado
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    throw new NotFoundError("Post não encontrado");
  }

  if (post.userId !== userId) {
    throw new AuthorizationError("Você não tem permissão para atualizar este post");
  }

  // Atualiza o post
  return await prisma.post.update({
    where: { id },
    data,
  });
};

// Deletar um post com verificação de propriedade
export const deletePost = async (id, userId) => {
  // Verifica se o post pertence ao usuário logado
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    throw new NotFoundError("Post não encontrado");
  }

  if (post.userId !== userId) {
    throw new AuthorizationError("Você não tem permissão para deletar este post");
  }

  // Deleta o post
  return await prisma.post.delete({
    where: { id },
  });
};