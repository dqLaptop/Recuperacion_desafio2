<?php

namespace App\Http\Controllers;
use App\Models\pruebaValoracion;
use App\Models\Atributo;
use Illuminate\Http\Request;

class pruebaValoracionController extends Controller
{
    /**
     * @author Isabel
     */
    public function show($id)
    {
        $valoracion = PruebaValoracion::where('idP',$id)->get();
        if (is_null($valoracion)) {
            return response()->json(["sucess" => false, "message" => "Prueba no encontrada"], 202);
        }else{
            $nombre = Atributo::where('id', $valoracion[0]['idA'])->get('nombre');
            $data=[
                "id"=>$valoracion[0]['id'],
                "idP"=>$valoracion[0]['idP'],
                "atributo"=>$nombre[0]['nombre']
            ];
            return response()->json(["sucess" => true, "data" => $data, "message" => "Recibida"],200);
        }
    }
    public function resolver()
    {
    }

}
