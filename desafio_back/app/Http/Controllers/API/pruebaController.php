<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Prueba;
use App\Models\User;
use App\Models\pruebaPuntual;
use App\Models\pruebaEleccion;
use App\Models\Atributo;
use App\Models\pruebaValoracion;
use App\Models\pruebaRespuestaLibre;
use Symfony\Component\Console\Input\Input;

class pruebaController extends Controller
{
    /**
     * @author Isabel
     */
    public function index()
    {
        $prueba = Prueba::all();
        return response()->json($prueba, 200);
    }
    /**
     * @author Isabel
     */
    public function show($id)
    {
        $prueba = Prueba::find($id);
        if (is_null($prueba)) {
            return response()->json(["sucess" => false, "message" => "Prueba no encontrada"], 202);
        } else {
            return response()->json(["sucess" => true, "data" => $prueba, "message" => "Recibida"], 200);
        }
    }

    /**
     * @author Isabel
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $tipo = $input['tipo'];
        $prueba = new Prueba();
        $prueba->descripcion = $input['descripcion'];
        $prueba->tipo = $tipo;
        $prueba->destino = $input['destino'];
        $prueba->idD = $input['idD'];
        try {
            $prueba->save();
            switch ($tipo) {
                case "puntual":
                    $idA = Atributo::where('nombre', $input['atributo'])->get('id');
                    $data = [
                        'idP' => $prueba->id,
                        'idA' => $idA[0]['id'],
                        'dificultad' => $input['dificultad']
                    ];
                    echo(json_encode($data));
                    pruebaPuntual::create($data);
                    return response()->json(["sucess" => true, "data" => $prueba, "message" => "Creada"], 200);
                    break;
                case "eleccion":
                    $data = [
                        'idP' => $prueba->id,
                        'valor_atributo' => $input['valorA'],
                    ];
                    pruebaEleccion::create($data);
                    return response()->json(["sucess" => true, "data" => $prueba, "message" => "Creada"], 200);
                    break;
                case "valoracion":
                    $idA = Atributo::where('nombre', $input['atributo'])->get('id');
                    $data = [
                        'idP' => $prueba->id,
                        'idA' => $idA[0]['id'],
                    ];
                    pruebaValoracion::create($data);
                    return response()->json(["sucess" => true, "data" => $prueba, "message" => "Creada"], 200);
                    break;
                case "respuesta libre":
                    $data = [
                        'idP' => $prueba->id,
                        'palabras_clave'=>$input['palabrasClave'],
                        'acierto'=>$input['acierto']
                    ];
                    pruebaRespuestaLibre::create($data);
                    return response()->json(["sucess" => true, "data" => $prueba, "message" => "Creada"], 200);
                    break;
            }
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "Error al insertar"], 202);
        }
    }

    /**
     * @author Isabel
     */
    public function update(Request $request,$cod)
    {
        $input = $request->all();
        $tipo = $input['tipo'];
        $prueba = Prueba::find($cod);
        $prueba->descripcion = $input['descripcion'];
        $prueba->tipo = $input['tipo'];
        $prueba->destino = $input['destino'];
        $prueba->idD = $input['idD'];
        try {
            $prueba->save();
            switch ($tipo) {
                case "puntual":
                    $puntual = pruebaPuntual::where('idP', $cod)->get();
                    $idA = Atributo::where('nombre', $input['atributo'])->get('id');
                    $puntual[0]->idA = $idA[0]['id'];
                    $puntual[0]->dificultad = $input['dificultad'];
                    $puntual[0]->save();
                    return response()->json(["sucess" => true, "data" => $prueba, "message" => "Modificada"], 200);
                    break;
                case "eleccion":
                    $eleccion = pruebaEleccion::where('idP', $cod)->get();
                    $eleccion[0]->valor_atributo = $input['valorA'];
                    $eleccion[0]->save();
                    return response()->json(["sucess" => true, "data" => $prueba, "message" => "Modificada"], 200);
                    break;
                case "valoracion":
                    $valoracion = pruebaValoracion::where('idP', $cod)->get();
                    $idA = Atributo::where('nombre', $input['atributo'])->get('id');
                    $valoracion[0]->idA = $idA[0]['id'];
                    $valoracion[0]->save();
                    return response()->json(["sucess" => true, "data" => $prueba, "message" => "Modificada"], 200);
                    break;
                case "respuesta libre":
                    $rl = pruebaRespuestaLibre::where('idP', $cod)->get();
                    $rl[0]->palabras_clave = $input['palabrasClave'];
                    $rl[0]->acierto = $input['acierto'];
                    $rl[0]->save();
                    return response()->json(["sucess" => true, "data" => $prueba, "message" => "Modificada"], 200);
                    break;
            }
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "Error al actualizar"], 202);
        }
    }
    /**
     * @author Isabel
     */
    public function destroy($cod)
    {
        $prueba = Prueba::find($cod);
        try {
            $prueba->delete();
            return response()->json(["sucess" => true, "data" => $prueba, "message" => "Borrada"], 200);
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "Prueba no encontrada"], 202);
        }
    }
}
