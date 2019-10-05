import { NegociacoesVew, MensageView } from "../views/index";
import { Negociacoes, Negociacao } from "../models/index";
import { NegociacaoEnum } from './NegociacaoEnum';
import { domInject } from './../helpers/decorators/index';
import { throttle } from './../helpers/decorators/index';
import { NegociacaoService } from '../service/index';
import { imprime } from './../helpers/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesVew('.negociacoesView');
    private _mensagemView = new MensageView('#mensagemView');

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        )

        this._negociacoes.adiciona(negociacao);
        
        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociacao adicionada com sucesso!');
    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != NegociacaoEnum.SABADO && data.getDay() != NegociacaoEnum.DOMINGO;
    }

    @throttle()
    importaDados() {

        this._negociacaoService.obterNegociacoes(res => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        })
        .then((negociacoesParaImportar: any) => {

            const negociacoesJaImportada = this._negociacoes.paraArray();

            negociacoesParaImportar
            .filter((negociacao: Negociacao) => 
                    !negociacoesJaImportada.some(jaImportada =>
                        negociacao.ehIgual(jaImportada)))
                    .forEach((negociacao: Negociacao) => 
                        this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);
        }).catch(err => {
            this._mensagemView.update(err.message);
        });
    }
}