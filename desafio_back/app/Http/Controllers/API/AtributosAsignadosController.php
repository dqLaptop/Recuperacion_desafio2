<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\atributos_asignado;

class AtributosAsignadosController extends Controller
{
    public function modificarAtributos(Request $req)
    {
        $id = $req->get('idU');
        $a = $req->get('atributos');
        $atributos = atributos_asignado::where('idU', $id)->get();

        if (is_null($atributos)) {
            return response()->json(["success" => false, "mensaje" => "No se han podido modifcar los atributos"], 202);
        } else {
            for ($i = 0; $i < count($atributos); $i++) {
                $atributos[$i]->valor = $a[$i];
                try {
                    $atributos[$i]->save();
                } catch (\Exception $e) {
                    return response()->json(["success" => false, "mensaje" => "No se han podido modifcar los atributos"], 202);
                }
            }
        }

        return response()->json(["sucess" => true, "message" => "Se han modificado correctamente los atributos"], 200);
    }
    public function obtenerInfoAtributos(Request $req)
    {
        $id = $req->get('id');
        $atributos = atributos_asignado::where('idU', $id)->get();
        for ($i = 0; $i < count($atributos); $i++) {
            $datos[] = $atributos[$i]->valor;
        }
        return response()->json(["sucess" => true, "data" => $datos, "message" => "Enviado"], 200);
    }
}
