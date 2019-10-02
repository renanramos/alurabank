import { NegociacoesVew, MensageView } from "../views/index";
import { Negociacoes, Negociacao } from "../models/index";
import { NegociacaoEnum } from './NegociacaoEnum';

export class NegociacaoController {

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesVew('.negociacoesView');
    private _mensagemView = new MensageView('#mensagemView');

    constructor() {
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }
    
    adiciona(event: Event) {

        event.preventDefault();

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

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update('Negociacao adicionada com sucesso!');

    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != NegociacaoEnum.SABADO && data.getDay() != NegociacaoEnum.DOMINGO;
    }

}