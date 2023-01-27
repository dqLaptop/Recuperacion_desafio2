<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Humano;

class HumanoController extends Controller
{
    /**
     * @author Manuel
     */
    public function index() {
        $usuario = Humano::all();
        return response()->json($usuario,200);
    }

    /**
     * @author Manuel
     * @deprecated Se sustituye por darInfoUsuario() en UserController
     */
    public function darInfoHumano($idU) {

        $humano = Humano::find($idU);
        $idDiosProtector = $humano->idD;
        $destinoHumano = $humano->destino;
        $situacionHumano = $humano->estado;
        $dios = User::find($idDiosProtector);
        $nombreDios = $dios->nombre;
        $usu = User::with(['atributos_asignados'])->where('id', $idU)->get();
        $nombreUsu = $usu[0]->nombre;
        $vectorObjetosAtributos = $usu[0]->atributos_asignados;
        for ($i = 0; $i < count($vectorObjetosAtributos); $i++) {
            $vectorValoresAtributos[] = $vectorObjetosAtributos[$i]->valor;
        }
        $datos = [
            'nombreUsuario' => $nombreUsu,
            'destino' => $destinoHumano,
            'situacion' => $situacionHumano,
            'nombreDios' => $nombreDios,
            'atributos' => $vectorValoresAtributos

        ];
        return response()->json(["sucess"=>true,"data"=>$datos,"message"=>"Enviada info"],200);
    }
}
