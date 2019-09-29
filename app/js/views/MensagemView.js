System.register(["./View"], function (exports_1, context_1) {
    "use strict";
    var View_1, MensageView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            MensageView = class MensageView extends View_1.View {
                template(model) {
                    return `<p class="alert alert-info">${model}</p>`;
                }
            };
            exports_1("MensageView", MensageView);
        }
    };
});
