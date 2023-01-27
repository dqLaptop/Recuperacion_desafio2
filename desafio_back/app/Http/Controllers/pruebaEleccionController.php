<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pruebaEleccion;
use App\Models\Humano;
use App\Models\Respuesta;
use App\Models\Prueba;

class pruebaEleccionController extends Controller
{
    /**
     * @author Isabel
     */
    public function show($id)
    {
        $eleccion = PruebaEleccion::where('idP', $id)->get();
        if (is_null($eleccion)) {
            return response()->json(["sucess" => false, "message" => "Prueba no encontrada"], 202);
        } else {
            $data = [
                "id" => $eleccion[0]['id'],
                "idP" => $eleccion[0]['idP'],
                "valor_atributo" => $eleccion[0]['valor_atributo']
            ];
            return response()->json(["sucess" => true, "data" => $data, "message" => "Recibida"], 200);
        }
    }
    /**
     * @author Isabel
     */
    public function resolver(Request $res)
    {
        $input = $res->all();
        $h = Humano::find($input['idU']);
        $pregunta = pruebaEleccion::with(['prueba'])->where('idP', $input['idP'])->get();
        $destino = $pregunta[0]['prueba']['destino'];
        $valor_pregunta = $pregunta[0]['valor_atributo'];
        try {
            if ($input['valor'] === $valor_pregunta) {
                $destinoTotal = $destino + $h['destino'];
                $h->destino = $destinoTotal;
                $this->modificarRespuesta($input['idU'], $input['idP'], $input['valor']);
                $h->save();
                return response()->json(["sucess" => true, "message" => "Felicidades has ganado " . $destino . " de destino"], 200);
            } else {
                $destinoTotal = $h['destino'] - $destino;
                if ($destinoTotal < 0) {
                    $h->estado = "Tartaro";
                    $h->destino = $destinoTotal;
                    $this->modificarRespuesta($input['idU'], $input['idP'], $input['valor']);
                    $h->save();
                    return response()->json(["sucess" => true, "message" => "Lo siento pero has muerto y has ido al Tartaro"], 200);
                }
                $h->destino = $destinoTotal;
                $this->modificarRespuesta($input['idU'], $input['idP'], $input['valor']);
                $h->save();
                return response()->json(["sucess" => true, "message" => "Lo siento, pero has perdido " . $destino . " de destino"], 200);
            }
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "Lo siento, pero algo ha salido mal y debes volver a repetir la prueba"], 202);
        }
    }
    /**
     * @author Isabel
     */
    public function modificarRespuesta($idU, $idP, $valor)
    {
        $r = Respuesta::where('idU', $idU)->where('idP', $idP)->get();
        if (!is_null($r)) {
            $r[0]->valor = $valor;
            $r[0]->realizada = true;
            $r[0]->save();
        }
    }
    public function obtenerNombreEleccion(Request $req)
    {
        $input = $req->all();
        $resp = Prueba::where('id', $input['idP'])->get("descripcion");
        if (is_null($resp)) {
            return response()->json(["sucess" => false, "message" => "Prueba no encontrada"], 200);
        }
        return response()->json(["sucess" => true, "data" => $resp, "message" => "Informacion enviada"], 200);
    }
}
