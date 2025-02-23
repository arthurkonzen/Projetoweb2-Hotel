const prisma = require('../prisma');

exports.criarReserva = async (req, res) => {
  try {
    const { checkIn, checkOut, clienteId, quartoId, hospedes } = req.body;

    // Verifica se o quarto está disponível
    const quarto = await prisma.quarto.findUnique({
      where: { id: quartoId },
    });

    if (!quarto || !quarto.disponivel) {
      return res.status(400).json({ error: 'Quarto não disponível' });
    }

    // Cria a reserva
    const reserva = await prisma.reserva.create({
      data: {
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        clienteId: parseInt(clienteId),
        quartoId: parseInt(quartoId),
        hospedes: {
          create: hospedes.map((hospede) => ({ nome: hospede.nome })),
        },
      },
      include: {
        hospedes: true,
      },
    });

    // Atualiza o status do quarto para indisponível
    await prisma.quarto.update({
      where: { id: quartoId },
      data: { disponivel: false },
    });

    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarReservas = async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: {
        cliente: true,
        quarto: true,
        hospedes: true,
      },
    });
    res.status(200).json(reservas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterReservaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await prisma.reserva.findUnique({
      where: { id: parseInt(id) },
      include: {
        cliente: true,
        quarto: true,
        hospedes: true,
      },
    });
    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ error: 'Reserva não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await prisma.reserva.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtém a reserva para verificar o quarto associado
    const reserva = await prisma.reserva.findUnique({
      where: { id: parseInt(id) },
    });

    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    // Deleta a reserva
    await prisma.reserva.delete({
      where: { id: parseInt(id) },
    });

    // Atualiza o status do quarto para disponível
    await prisma.quarto.update({
      where: { id: reserva.quartoId },
      data: { disponivel: true },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//////////////////////

exports.filtrarReservasPorData = async (req, res) => {
    try {
      const { data } = req.query;
  
      // Verifica se a data foi fornecida
      if (!data) {
        return res.status(400).json({ error: 'Data é obrigatória' });
      }
  
      // Converte a data para o formato correto
      const filtroData = new Date(data);
  
      // Busca reservas que incluem a data especificada
      const reservas = await prisma.reserva.findMany({
        where: {
          AND: [
            { checkIn: { lte: filtroData } },
            { checkOut: { gte: filtroData } },
          ],
        },
        include: {
          cliente: true,
          quarto: true,
          hospedes: true,
        },
      });
  
      res.status(200).json(reservas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };