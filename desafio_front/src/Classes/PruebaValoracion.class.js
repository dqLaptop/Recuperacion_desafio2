import { Prueba } from "./Prueba.class";

export class PruebaValoracion extends Prueba  {

    constructor(descripcion,destino,tipo,idD,atributo) {
        super(descripcion,destino,tipo,idD);
       this.atributo=atributo;
    }
}