export function logarTempoDeExecucao() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            console.log(`parâmetros metodos ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`O retorno é ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`performance: ${t2 - t1}`);
            return retorno;
        }

        return descriptor;
    }
}