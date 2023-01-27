<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comentario;
use App\Models\User;
use Exception;

class ComentarioController extends Controller
{
    public function index($idU)
    {
        $c = [];
        $comentario = Comentario::where('idU', $idU)->orWhere('idR', $idU)->get();
        for ($i = 0; $i < count($comentario); $i++) {
            $usuarioP = User::find($comentario[$i]['idU']);
            $usuarioR = User::find($comentario[$i]['idR']);
            $data = [
                'id' => $comentario[$i]['id'],
                'asunto' => $comentario[$i]['asunto'],
                'comentario' => $comentario[$i]['comentario'],
                'emailP' => $usuarioP['email'],
                'emailR' => $usuarioR['email']
            ];
            $c[] = $data;
        }
        return response()->json($c, 200);
    }
    public function show(Request $req)
    {
        $email = $req->get('email');
        $idU = $req->get('id');
        try {
            $usuario = User::where('email', $email)->get();
            $comentario = Comentario::where('idU', $idU)->Where('idR', $usuario[0]['id'])->get();
            for ($i = 0; $i < count($comentario); $i++) {
                $usuarioP = User::find($comentario[$i]['idU']);
                $usuarioR = User::find($comentario[$i]['idR']);
                $data = [
                    'id' => $comentario[$i]['id'],
                    'asunto' => $comentario[$i]['asunto'],
                    'comentario' => $comentario[$i]['comentario'],
                    'emailP' => $usuarioP['email'],
                    'emailR' => $usuarioR['email']
                ];
                $c[] = $data;
            }
            return response()->json($c, 200);
        } catch (\Exception $e) {
            return response()->json("Error en la busqueda", 202);
        }
    }
    public function obtenerComentario($id)
    {
        $comentario = Comentario::find($id);
        if (is_null($comentario)) {
            return response()->json(["sucess" => false, "message" => "No se han encontrado el comentario"], 202);
        } else {
            $usuarioP = User::find($comentario['idU']);
            $usuarioR = User::find($comentario['idR']);
            $data = [
                'id' => $comentario['id'],
                'asunto' => $comentario['asunto'],
                'comentario' => $comentario['comentario'],
                'emailP' => $usuarioP['email'],
                'emailR' => $usuarioR['email'],
                'nombreR' => $usuarioR['nombre']
            ];
            return response()->json(["success" => true, "data" => $data], 200);
        }
    }
    public function indexLeidos($idU)
    {
        $comentario = Comentario::where('idU', $idU)->orWhere('idR', $idU)->where('leido', 1)->get();
        for ($i = 0; $i < count($comentario); $i++) {
            $usuarioP = User::find($comentario[$i]['idU']);
            $usuarioR = User::find($comentario[$i]['idR']);
            $data = [
                'id' => $comentario[$i]['id'],
                'asunto' => $comentario[$i]['asunto'],
                'comentario' => $comentario[$i]['comentario'],
                'emailP' => $usuarioP['email'],
                'emailR' => $usuarioR['email']
            ];
            $c[] = $data;
            return response()->json($c, 200);
        }
    }
    public function indexNoLeidos($idU)
    {
        $comentario = Comentario::where('idU', $idU)->orWhere('idR', $idU)->where('leido', 0)->get();
        for ($i = 0; $i < count($comentario); $i++) {
            $usuarioP = User::find($comentario[$i]['idU']);
            $usuarioR = User::find($comentario[$i]['idR']);
            $data = [
                'id' => $comentario[$i]['id'],
                'asunto' => $comentario[$i]['asunto'],
                'comentario' => $comentario[$i]['comentario'],
                'emailP' => $usuarioP['email'],
                'emailR' => $usuarioR['email']
            ];
            $c[] = $data;
            return response()->json($c, 200);
        }
    }
    public function destroy($cod)
    {
        $comentario = Comentario::find($cod);
        try {
            $comentario->delete();
            return response()->json(["sucess" => true, "data" => $comentario, "message" => "Borrada"], 200);
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "Comentario no encontrado"], 202);
        }
    }
    public function store(Request $req)
    {
        $c = $req->all();
        try {
            for ($i = 0; $i < count($c['email']); $i++) {
                $comentario = new Comentario();
                $u = User::where('email', $c['email'][$i])->get();
                $comentario->idU = $c['idU'];
                $comentario->idR = $u[0]['id'];
                $comentario->asunto = $c['asunto'];
                $comentario->comentario = $c['comentario'];
                $comentario->leido = false;

                $comentario->save();
            }
            return response()->json(["sucess" => true, "message" => "Se ha creado y enviado correctamente"], 200);
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "No se ha podido crear o enviar comentario"], 202);
        }
    }
    public function storeTodos(Request $req)
    {
        $c = $req->all();
        $u = User::where('id', 'not like', $c['idU'])->get();
        try {
            for ($i = 0; $i < count($u); $i++) {
                $comentario = new Comentario();
                $comentario->idU = $c['idU'];
                $comentario->idR = $u[$i]['id'];
                $comentario->asunto = $c['asunto'];
                $comentario->comentario = $c['comentario'];
                $comentario->leido = false;

                $comentario->save();
            }
            return response()->json(["sucess" => true, "message" => "Se ha creado y enviado correctamente"], 200);
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "No se ha podido crear o enviar comentario"], 202);
        }
    }
    public function modificarNoLeido(Request $req)
    {
        $c = $req->all();
        $comentario=Comentario::find($c['id']);
        if(is_null($comentario)){
            return response()->json(["sucess" => false, "message" => "No se ha encontrado el comentario"], 203);
        }else{
            $comentario->leido=true;
            try{
                $comentario->save();
                return response()->json(["sucess" => true, "message" => "Se ha modificado correctamente"], 200);
            }catch(\Exception $e){
                return response()->json(["sucess" => false, "message" => "No se ha podido modificar"], 203);
            }

        }
    }
}
