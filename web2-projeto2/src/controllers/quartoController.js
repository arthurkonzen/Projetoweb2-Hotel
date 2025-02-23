const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criarQuarto = async (req, res) => {
  try {
    const quarto = await prisma.quarto.create({
      data: req.body,
    });
    res.status(201).json(quarto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarQuartos = async (req, res) => {
  try {
    const quartos = await prisma.quarto.findMany();
    res.status(200).json(quartos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obterQuartoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const quarto = await prisma.quarto.findUnique({
      where: { id: parseInt(id) },
    });
    if (quarto) {
      res.status(200).json(quarto);
    } else {
      res.status(404).json({ error: 'Quarto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizarQuarto = async (req, res) => {
  try {
    const { id } = req.params;
    const quarto = await prisma.quarto.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json(quarto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarQuarto = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.quarto.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//// /////////

exports.buscarQuartosDisponiveis = async (req, res) => {
    try {
      const { checkIn, checkOut } = req.query;
  
      // Verifica se as datas foram fornecidas
      if (!checkIn || !checkOut) {
        return res.status(400).json({ error: 'Datas de check-in e check-out são obrigatórias' });
      }
  
      // Converte as datas para o formato correto
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
  
      // Busca quartos que não têm reservas conflitantes
      const quartosDisponiveis = await prisma.quarto.findMany({
        where: {
          disponivel: true,
          NOT: {
            reservas: {
              some: {
                OR: [
                  {
                    checkIn: { lte: checkOutDate },
                    checkOut: { gte: checkInDate },
                  },
                ],
              },
            },
          },
        },
      });
  
      res.status(200).json(quartosDisponiveis);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



//////

exports.gerarRelatorioOcupacao = async (req, res) => {
    try {
      const { inicio, fim } = req.query;
  
      // Verifica se as datas foram fornecidas
      if (!inicio || !fim) {
        return res.status(400).json({ error: 'Datas de início e fim são obrigatórias' });
      }
  
      // Converte as datas para o formato correto
      const inicioDate = new Date(inicio);
      const fimDate = new Date(fim);
  
      // Busca todas as reservas no período especificado
      const reservas = await prisma.reserva.findMany({
        where: {
          AND: [
            { checkIn: { lte: fimDate } },
            { checkOut: { gte: inicioDate } },
          ],
        },
        include: {
          quarto: true,
        },
      });
  
      // Calcula a ocupação por quarto
      const ocupacaoPorQuarto = reservas.reduce((acc, reserva) => {
        const quartoId = reserva.quarto.id;
        if (!acc[quartoId]) {
          acc[quartoId] = {
            quarto: reserva.quarto,
            totalDiasOcupados: 0,
          };
        }
        const diasOcupados = Math.ceil((reserva.checkOut - reserva.checkIn) / (1000 * 60 * 60 * 24));
        acc[quartoId].totalDiasOcupados += diasOcupados;
        return acc;
      }, {});
  
      res.status(200).json(Object.values(ocupacaoPorQuarto));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };