<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Respuesta;
use App\Models\User;
use App\Models\Prueba;

class RespuestaController extends Controller
{
    public function asignarPrueba(Request $res) //Añadir comprobaciones para que si no esta finalizada y la tiene el usuario ya no se le añadan más
    {
        $input = $res->all();
        $annadidos = [];
        $excluidos = [];

        for ($i = 0; $i < count($input['idU']); $i++) {
            $data = [
                'idU' => $input['idU'][$i],
                'idP' => $input['idP'],
                'valor' => "",
                'realizada' => false
            ];
            $comprobacion = Respuesta::where('idU', $input['idU'][$i])->where('idP', $input['idP'])->where('realizada', false)->get();
            $nombre = User::where('id', $input['idU'][$i])->get('nombre');
            if (count($comprobacion) === 0) {
                $annadidos[] = $nombre[0]['nombre'];
                try {
                    Respuesta::create($data);
                } catch (\Exception $e) {
                    return response()->json(["sucess" => false, "message" => "No se ha podido asignar"], 203);
                }
            } else {
                $excluidos[] = $nombre[0]['nombre'];
            }
        }
        $datos = [
            "add" => $annadidos,
            "excluidos" => $excluidos
        ];

        return response()->json(["sucess" => true, "data" => $datos, "message" => "Se ha asignado correctamente"], 200);
    }
    public function asignarTodos(Request $res) //Añadir comprobaciones para que si no esta finalizada y la tiene el usuario ya no se le añadan más
    {
        $input = $res->all();
        $annadidos = [];
        $excluidos = [];
        $u = User::whereNotIn('idR', [2, 3])->get();

        for ($i = 0; $i < count($u); $i++) {
            $data = [
                'idU' => $u[$i]->id,
                'idP' => $input['idP'],
                'valor' => "",
                'realizada' => false
            ];
            $comprobacion = Respuesta::where('idU', $u[$i]->id)->where('idP', $input['idP'])->where('realizada', false)->get();
            if (count($comprobacion) === 0) {
                $annadidos[] = $u[$i]->nombre;
                try {
                    Respuesta::create($data);
                } catch (\Exception $e) {
                    return response()->json(["sucess" => false, "message" => "No se ha podido asignar"], 203);
                }
            } else {
                $excluidos[] = $u[$i]->nombre;
            }
        }
        $datos = [
            "add" => $annadidos,
            "excluidos" => $excluidos
        ];

        return response()->json(["sucess" => true, "data" => $datos, "message" => "Se ha asignado correctamente"], 200);
    }
    public function obtenerInfoPruebaRespuesta(Request $req)
    {
        $input = $req->all();
        $resp = Respuesta::with(['prueba'])->where('idU', $input['id'])->get();
        $datos = [];

        try {
            foreach ($resp as $r) {
                $dios = User::where('id', $r["prueba"]["idD"])->get("nombre");
                $data = [
                    "idP" => $r["idP"],
                    "descripcion" => $r["prueba"]["descripcion"],
                    "tipo" => $r["prueba"]["tipo"],
                    "destino" => $r["prueba"]["destino"],
                    "Dios" => $dios[0]["nombre"],
                    "finalizada" => $r["realizada"],
                    "valor" => $r["valor"]
                ];
                $datos[] = $data;
            }
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "Prueba no encontrada"], 200);
        }
        return response()->json(["sucess" => true, "data" => $datos, "message" => "Informacion enviada"], 200);
    }
}
