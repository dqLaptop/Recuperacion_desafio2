import { Prueba } from "./Prueba.class";

export class PruebaRespuestaLibre extends Prueba  {

    constructor(descripcion,destino,tipo,idD,palabras,acierto) {
        super(descripcion,destino,tipo,idD);
       this.palabrasClave=palabras;
       this.acierto=acierto;
    }
}