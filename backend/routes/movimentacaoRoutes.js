
const express = require('express');

const router = express.Router();

const Movimentacao = require('../models/Movimentacao');

// Listar todas as movimentações
router.get('/', async (req, res) => {
    try {
        const movimentacoes = await Movimentacao.find().sort({ data: -1 });

        res.status(200).json(movimentacoes);

    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao buscar movimentações',
            erro: erro.message
        });
    }
});

// Cadastrar uma movimentação
router.post('/', async (req, res) => {
    try {
        const novaMovimentacao = new Movimentacao(req.body);

        const movimentacaoSalva = await novaMovimentacao.save();

        res.status(201).json(movimentacaoSalva);

    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar movimentação',
            erro: erro.message
        });
    }
});

// Excluir uma movimentação
router.delete('/:id', async (req, res) => {
    try {
        const movimentacaoExcluida = await Movimentacao.findByIdAndDelete(req.params.id);

        if (!movimentacaoExcluida) {
            return res.status(404).json({
                mensagem: 'Movimentação não encontrada'
            });
        }

        res.status(200).json({
            mensagem: 'Movimentação excluída com sucesso!'
        });

    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao excluir movimentação',
            erro: erro.message
        });
    }
});

module.exports = router;

