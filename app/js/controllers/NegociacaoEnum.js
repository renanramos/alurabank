System.register([], function (exports_1, context_1) {
    "use strict";
    var NegociacaoEnum;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (NegociacaoEnum) {
                NegociacaoEnum[NegociacaoEnum["DOMINGO"] = 0] = "DOMINGO";
                NegociacaoEnum[NegociacaoEnum["SEGUNDA"] = 1] = "SEGUNDA";
                NegociacaoEnum[NegociacaoEnum["TERCA"] = 2] = "TERCA";
                NegociacaoEnum[NegociacaoEnum["QUARTA"] = 3] = "QUARTA";
                NegociacaoEnum[NegociacaoEnum["QUINTA"] = 4] = "QUINTA";
                NegociacaoEnum[NegociacaoEnum["SEXTA"] = 5] = "SEXTA";
                NegociacaoEnum[NegociacaoEnum["SABADO"] = 6] = "SABADO";
            })(NegociacaoEnum || (NegociacaoEnum = {}));
            exports_1("NegociacaoEnum", NegociacaoEnum);
        }
    };
});
