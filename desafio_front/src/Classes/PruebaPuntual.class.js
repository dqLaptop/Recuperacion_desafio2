import { Prueba } from "./Prueba.class";

export class PruebaPuntual extends Prueba {

    constructor(descripcion,destino,tipo,idD,atributo, dificultad) {
        super(descripcion,destino,tipo,idD);
        this.atributo = atributo;
        this.dificultad = dificultad;
    }
}