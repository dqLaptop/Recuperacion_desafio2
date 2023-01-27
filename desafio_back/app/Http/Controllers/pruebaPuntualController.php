<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Atributo;
use App\Models\pruebaPuntual;

class pruebaPuntualController extends Controller
{
    /**
     * @author Isabel
     */
    public function show($id)
    {
        $puntual = PruebaPuntual::where('idP',$id)->get();
        if (is_null($puntual)) {
            return response()->json(["sucess" => false, "message" => "Prueba no encontrada"], 202);
        } else {
            $nombre = Atributo::where('id', $puntual[0]['idA'])->get('nombre');
            $data=[
                "id"=>$puntual[0]['id'],
                "idP"=>$puntual[0]['idP'],
                "atributo"=>$nombre[0]['nombre'],
                "dificultad"=>$puntual[0]['dificultad']
            ];
            return response()->json(["sucess" => true, "data" => $data, "message" => "Recibida"],200);
        }
    }
    /**
     * @author Isabel
     */
    public function resolver()
    {
    }
}
