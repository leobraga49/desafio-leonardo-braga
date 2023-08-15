import { CaixaDaLanchonete } from './caixa-da-lanchonete.js';

const validarCompra = (formaDePagamento, itens) => {
    const caixa = new CaixaDaLanchonete();
    return caixa.calcularValorDaCompra(formaDePagamento, itens);
};

const teste = validarCompra('debito', ['chantily,1']);

console.log(teste);
