const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criarCliente = async (req, res) => {
  try {
    const cliente = await prisma.cliente.create({
      data: req.body,
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
    });
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cliente.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};