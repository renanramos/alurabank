var Views;
(function (Views) {
    class MensageView extends Views.View {
        template(model) {
            return `<p class="alert alert-info">${model}</p>`;
        }
    }
    Views.MensageView = MensageView;
})(Views || (Views = {}));
