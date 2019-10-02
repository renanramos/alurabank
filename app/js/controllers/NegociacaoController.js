System.register(["../views/index", "../models/index", "./NegociacaoEnum"], function (exports_1, context_1) {
    "use strict";
    var index_1, index_2, NegociacaoEnum_1, NegociacaoController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (NegociacaoEnum_1_1) {
                NegociacaoEnum_1 = NegociacaoEnum_1_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesVew('.negociacoesView');
                    this._mensagemView = new index_1.MensageView('#mensagemView');
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update('Somente negociações em dias úteis, por favor!');
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociacao adicionada com sucesso!');
                }
                _ehDiaUtil(data) {
                    return data.getDay() != NegociacaoEnum_1.NegociacaoEnum.SABADO && data.getDay() != NegociacaoEnum_1.NegociacaoEnum.DOMINGO;
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
