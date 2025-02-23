const express = require('express');
const app = express();
const quartoRoutes = require('./routes/quartoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

// Middleware para processar JSON
app.use(express.json());

// Rotas para Quarto
app.use('/api/quartos', quartoRoutes);

// Rotas para Cliente
app.use('/api/clientes', clienteRoutes);

// Rotas para Reserva
app.use('/api/reservas', reservaRoutes);

// Rota padrão para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor do sistema de gerenciamento de hotel está rodando!');
});

// Middleware para tratar erros 404 (Rota não encontrada)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware para tratar erros globais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});