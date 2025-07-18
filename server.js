
const express = require('express');
const app = express();
app.use(express.json());

module.exports = (client) => {
  app.post('/comando', async (req, res) => {
    const { comando, alvo } = req.body;
    const canal = client.channels.cache.find(c => c.name === 'geral');

    if (!canal) return res.send('Canal não encontrado');

    if (comando === 'falar') {
      canal.send(alvo);
      return res.send('Falei!');
    }

    if (comando === 'mutar' || comando === 'banir') {
      return res.send('Comando reservado. Só funciona dentro do Discord.');
    }

    res.send('Comando não reconhecido');
  });

  app.listen(3000, () => {
    console.log('Painel rodando em http://localhost:3000');
  });
};
