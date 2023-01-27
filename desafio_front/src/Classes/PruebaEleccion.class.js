import { Prueba } from "./Prueba.class";

export class PruebaEleccion extends Prueba {

    constructor(descripcion,destino,tipo,idD,valorA) {
        super(descripcion,destino,tipo,idD);
        this.valorA = valorA;
    }
}