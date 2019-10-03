import { NegociacoesVew, MensageView } from "../views/index";
import { Negociacoes, Negociacao } from "../models/index";
import { NegociacaoEnum } from './NegociacaoEnum';
import { domInject } from './../helpers/decorators/index';
import { throttle } from './../helpers/decorators/index';
import { NegociacaoService } from '../service/index';

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
    adiciona(event: Event) {

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

    @throttle()
    importaDados() {

        function isOk(res: Response) {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        this._negociacaoService.obterNegociacoes(isOk)
            .then((negociacoes: any) => {
                negociacoes.forEach((negociacao: any) => this._negociacoes.adiciona(negociacao))
                this._negociacoesView.update(negociacoes);
            });


    }

}