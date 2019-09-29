import { View } from './View';
import { Negociacoes } from "./../models/Negociacoes";

export class NegociacoesVew extends View<Negociacoes> {

    template(model: Negociacoes): string {
        return `
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${model.paraArray().map(negociacao =>
            `
                                <tr>
                                    <td>${negociacao.data.getDate()}/${negociacao.data.getMonth() + 1}/${negociacao.data.getFullYear()}</td>
                                    <td>${negociacao.quantidade}</td>
                                    <td>${negociacao.valor}</td>
                                    <td>${negociacao.volume}</td>
                                </tr>
                            `).join('')}
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>`;
    }
}