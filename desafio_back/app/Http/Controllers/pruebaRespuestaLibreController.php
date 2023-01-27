<?php

namespace App\Http\Controllers;

use App\Models\pruebaRespuestaLibre;
use App\Models\Atributo;
use Illuminate\Http\Request;

class pruebaRespuestaLibreController extends Controller
{
    /**
     * @author Isabel
     */
    public function show($id)
    {
        $rl = pruebaRespuestaLibre::where('idP',$id)->get();
        if (is_null($rl)) {
            return response()->json(["sucess" => false, "message" => "Prueba no encontrada"], 202);
        } else {
            $data=[
                "id"=>$rl[0]['id'],
                "idP"=>$rl[0]['idP'],
                "acierto"=>$rl[0]['acierto'],
                "palabras_clave"=>$rl[0]['palabras_clave']
            ];
            return response()->json(["sucess" => true, "data" => $data, "message" => "Recibida"],200);
        }
    }
    public function resolver()
    {
    }
}
