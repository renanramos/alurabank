System.register(["../views/index", "../models/index", "./NegociacaoEnum", "./../helpers/decorators/index", "../service/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var index_1, index_2, NegociacaoEnum_1, index_3, index_4, index_5, NegociacaoController;
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
            },
            function (index_3_1) {
                index_3 = index_3_1;
                index_4 = index_3_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesVew('.negociacoesView');
                    this._mensagemView = new index_1.MensageView('#mensagemView');
                    this._negociacaoService = new index_5.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona(event) {
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
                importaDados() {
                    function isOk(res) {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    }
                    this._negociacaoService.obterNegociacoes(isOk)
                        .then((negociacoes) => {
                        negociacoes.forEach((negociacao) => this._negociacoes.adiciona(negociacao));
                        this._negociacoesView.update(negociacoes);
                    });
                }
            };
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_4.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_4.throttle()
            ], NegociacaoController.prototype, "importaDados", null);
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
