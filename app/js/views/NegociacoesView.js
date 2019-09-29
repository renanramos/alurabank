class NegociacoesVew {
    constructor(seletor) {
        this._element = document.querySelector(seletor);
    }
    update(model) {
        if (model.paraArray().length > 0) {
            this._element.innerHTML = this.template(model);
        }
    }
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
            </table>
        `;
    }
}
