import { NegociacoesVew, MensageView } from "../views/index";
import { Negociacoes, Negociacao } from "../models/index";
import { NegociacaoEnum } from './NegociacaoEnum';
import { domInject } from './../helpers/decorators/index';
import { NegociacaoParcial } from './../models/index';

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

    constructor() {
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

    importaDados() {
        function isOk(res: Response) {
            if(res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }
        fetch('http://localhost:8080/dados')
            .then(res => isOk(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => {
                dados
                    .map(dado=> new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao))
                this._negociacoesView.update(this._negociacoes);
            })
            .catch(err => console.log(err.message))
    }

}