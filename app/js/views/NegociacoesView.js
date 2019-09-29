System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, NegociacoesVew;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            NegociacoesVew = class NegociacoesVew extends View_1.View {
                template(model) {
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
                        ${model.paraArray().map(negociacao => `
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
            };
            exports_1("NegociacoesVew", NegociacoesVew);
        }
    };
});
