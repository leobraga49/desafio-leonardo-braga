class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };
        this.formasDePagamento = ['debito', 'credito', 'dinheiro'];
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.ehFormaDePagamentoValida(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        const validacaoItemExtra = this.validarItensExtras(itens);

        if (!validacaoItemExtra.valido) {
            return validacaoItemExtra.mensagem;
        }
            
        const total = this.calcularTotalDaCompra(itens);
        
        if (typeof total === 'string') {
            return total;
        }
        
        const totalComDesconto = this.aplicarDescontoOuAcrescimo(formaDePagamento, total);

        return `R$ ${totalComDesconto.toFixed(2).replace('.', ',')}`;
    }

    ehFormaDePagamentoValida(formaDePagamento) {
        return this.formasDePagamento.includes(formaDePagamento);
    }

    calcularTotalDaCompra(itens) {
        let total = 0;
        for (const item of itens) {
            const [pedido, quantidade] = item.split(',');

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }
            if (!this.cardapio[pedido]) {
                return 'Item inválido!';
            }
            total += this.cardapio[pedido].valor * quantidade;
        }         
        return total;
    }

    aplicarDescontoOuAcrescimo(formaDePagamento, total) {
        if (formaDePagamento === 'dinheiro') {
            return total * 0.95;
        } else if (formaDePagamento === 'credito') {
            return total * 1.03;
        }
        return total;
    }

    validarItensExtras(itens) {
        const cafePresente = itens.some(item => item.startsWith('cafe'));
        const sanduichePresente = itens.some(item => item.startsWith('sanduiche'));

        if (itens.some(item => item.startsWith('chantily') && !cafePresente)) {
            return { valido: false, mensagem: 'Item extra não pode ser pedido sem o principal' };
        } else if (itens.some(item => item.startsWith('queijo') && !sanduichePresente)) {
            return { valido: false, mensagem: 'Item extra não pode ser pedido sem o principal' };
        }

        return { valido: true };
    }
}

export { CaixaDaLanchonete };
