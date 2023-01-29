<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\Rol;
use App\Models\Humano;
use App\Models\Parametro;
use Carbon\Carbon;
use App\Models\atributos_asignado;


class UserController extends Controller
{

    /**
     * @author Manuel
     */
    public function index()
    {
        $usuario = User::all();
        return response()->json($usuario, 200);
    }

    /**
     * @author Manuel
     */
    public function listar($nom)
    {
        $usuario = User::where('nombre', $nom)->get();
        if (is_null($usuario)) {
            return response()->json(["sucess" => false, "message" => "Usuario no encontrado"], 202);
        }
        return response()->json(["sucess" => true, "data" => $usuario, "message" => "Retrieved"]);
    }

    /**
     * @author Manuel
     */
    public function show($id)
    {
        $usuario = User::find($id);
        if (is_null($usuario)) {
            return response()->json(["sucess" => false, "message" => "Usuario no encontrado"], 202);
        }
        return response()->json(["sucess" => true, "data" => $usuario, "message" => "Retrieved"]);
    }

    /**
     * @author Manuel
     */
    public function update($nom, Request $request)
    {
        $input = $request->all();
        $usuario = User::where('nombre', $nom)->first();
        $usuario->nombre = $input['nombre'];
        $usuario->password = bcrypt($input['password']);
        $rol = Rol::where('nombre', $input['rol'])->get();
        $usuario->idR = $rol[0]->id;
        $usuario->email = $input['email'];
        try {
            $usuario->save();
            return response()->json(["sucess" => true, "data" => $usuario, "message" => "Updated"]);
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "Error al actualizar"], 202);
        }
    }

    /**
     * @author Manuel
     */
    public function destroy($nom)
    {
        $usuario = User::where('nombre', $nom)->first();
        try {
            $usuario->delete();
            return response()->json(["sucess" => true, "data" => $usuario, "message" => "Deleted"], 200);
        } catch (\Exception $e) {
            return response()->json(["sucess" => false, "message" => "Usuario no encontrado"], 202);
        }
    }

    /**
     * @author Isabel
     */
    public function mofidificarVerificacion(Request $req)
    {
        $mensaje = "";
        $id = $req->route()->parameter('id');
        $verificacion = Carbon::now()->format('Y-m-d H:i:s');
        $usuario = User::find($id);

        if ($usuario !== null) {
            $usuario->email_verified_at = $verificacion;
            $usuario->save();
            $this->enviarCorreoBienvenida($id); //Isabel; inserto esta linea para el correo de bienvenida
            $mensaje = "Correo Verificado";
        } else {
            $mensaje = "No se pudo verificar";
        }
        return response()->json(['Resultado' => $mensaje], 200);
    }

    /**
     * @author Manuel
     */
    public function enviarCorreoBienvenida($idU)
    {
        $humano = Humano::find($idU);
        $idDiosProtector = $humano->idD;
        $dios = User::find($idDiosProtector);
        $nombreDios = $dios->nombre;
        $emailDios = $dios->email;
        $usu = User::with(['atributos_asignados'])->where('id', $idU)->get();
        $nombreUsu = $usu[0]->nombre;
        $emailUsu = $usu[0]->email;
        $vectorObjetosAtributos = $usu[0]->atributos_asignados;
        for ($i = 0; $i < count($vectorObjetosAtributos); $i++) {
            $vectorValoresAtributos[] = $vectorObjetosAtributos[$i]->valor;
        }
        $datos = [
            'email' => $emailUsu,
            'nombreUsuario' => $nombreUsu,
            'nombreDios' => $nombreDios,
            'emailDios' => $emailDios,
            'atributos' => $vectorValoresAtributos
        ];
        $email = $emailUsu;
        $nombre = 'alumnoDaw';
        Mail::send('bienvenida', $datos, function ($message) use ($email) {
            $message->to($email)->subject('Bienvenido al Olimpo');
            $message->from('AuxiliarDAW2@gmail.com', 'Bienvenida al Olimpo de los dioses');
        });
        return response()->json(["enviado" => true, "mensaje" => "Enviado"], 200);
    }

    /**
     * Se crea este nuevo metodo en vez del que habia en HumanoController, para que envíe
     * tambien los datos de los dioses.
     *
     * @author Manuel
     */
    public function darInfoUsuario($idU)
    {
        $humano = Humano::find($idU);
        if ($humano !== null) {
            $idDiosProtector = $humano->idD;
            $destinoHumano = $humano->destino;
            $situacionHumano = $humano->estado;
            $dios = User::find($idDiosProtector);
            $nombreDios = $dios->nombre;
            $limiteEliseo = 0;
        } else {
            $nombreDios = '';
            $destinoHumano = 0;
            $situacionHumano = '';
            $eliseo = Parametro::where('nombre', 'eliseo')->first();
            $limiteEliseo = $eliseo->valor;
        }

        $usu = User::with(['atributos_asignados'])->where('id', $idU)->get();
        $nombreUsu = $usu[0]->nombre;
        $rol = $usu[0]->idR;
        $vectorObjetosAtributos = $usu[0]->atributos_asignados;
        for ($i = 0; $i < count($vectorObjetosAtributos); $i++) {
            $vectorValoresAtributos[] = $vectorObjetosAtributos[$i]->valor;
        }
        $datos = [
            'nombreUsuario' => $nombreUsu,
            'rolUsuario' => $rol,
            'destino' => $destinoHumano,
            'situacion' => $situacionHumano,
            'nombreDios' => $nombreDios,
            'limiteEliseo' => $limiteEliseo,
            'atributos' => $vectorValoresAtributos

        ];
        return response()->json(["sucess" => true, "data" => $datos, "message" => "Enviada info"], 200);
    }
    public function obtenerVivos()
    {
        $usuario = Humano::with(['usuarios'])->where('estado', 'vivo')->get();
        $datos = [];
        foreach ($usuario as $u) {
            $atributos = atributos_asignado::where('idU', $u['usuarios']->id)->get();
            $diosAfin = User::where('id', $u->idD)->get('nombre');
            $rol = Rol::where('id', $u['usuarios']['idR'])->get('nombre');

            $data = [
                "id" => $u->idU,
                "nombre" => $u['usuarios']['nombre'],
                "email" => $u['usuarios']['email'],
                "rol" => $rol[0]['nombre'],
                "sabiduria" => $atributos[0]->valor,
                "nobleza" => $atributos[1]->valor,
                "virtud" => $atributos[2]->valor,
                "maldad" => $atributos[3]->valor,
                "astucia" => $atributos[4]->valor,
                "diosAfin" => $diosAfin[0]['nombre'],
                "destino" => $u->destino,
                "estado" => $u->estado
            ];
            $datos[] = $data;
        }


        return response()->json(["sucess" => true, "data" => $datos, "message" => "Enviada info"], 200);
    }
    public function obtenerMuertos()
    {
        $usuario = Humano::with(['usuarios'])->where('estado', 'Tartaro')->get();
        $datos = [];
        foreach ($usuario as $u) {
            $atributos = atributos_asignado::where("idU",$u['usuarios']->id)->get();
            $diosAfin = User::where('id', $u->idD)->get('nombre');
            $rol = Rol::where('id', $u['usuarios']['idR'])->get('nombre');
            $data = [
                "id" => $u->idU,
                "nombre" => $u['usuarios']['nombre'],
                "email" => $u['usuarios']['email'],
                "rol" => $rol[0]['nombre'],
                "sabiduria" => $atributos[0]->valor,
                "nobleza" => $atributos[1]->valor,
                "virtud" => $atributos[2]->valor,
                "maldad" => $atributos[3]->valor,
                "astucia" => $atributos[4]->valor,
                "diosAfin" => $diosAfin[0]['nombre'],
                "destino" => $u->destino,
                "estado" => $u->estado
            ];
            $datos[] = $data;
        }
        return response()->json(["sucess" => true, "data" => $datos, "message" => "Enviada info"], 200);
    }

    public function obtenerUsuarios()
    {
        $usuarios = User::with(['atributos_asignados', 'humanos'])->get();
        $datos = [];
        foreach ($usuarios as $u) {
            for ($i = 0; $i < count($usuarios); $i++) {
                $rol = Rol::where('id', $u->idR)->get('nombre');
                if ($u->humanos === null) {
                    $data = [
                        "id" => $u->id,
                        "nombre" => $u->nombre,
                        "email" => $u->email,
                        "rol" => $rol[0]['nombre'],
                        "sabiduria" => $u->atributos_asignados[0]['valor'],
                        "nobleza" => $u->atributos_asignados[1]['valor'],
                        "virtud" => $u->atributos_asignados[2]['valor'],
                        "maldad" => $u->atributos_asignados[3]['valor'],
                        "astucia" => $u->atributos_asignados[4]['valor'],
                        "diosAfin" => "---",
                        "destino" => "---",
                        "estado" => "---"
                    ];
                } else {
                    $diosAfin = User::where('id', $u->humanos['idD'])->get('nombre');
                    $data = [
                        "id" => $u->id,
                        "nombre" => $u->nombre,
                        "email" => $u->email,
                        "rol" => $rol[0]['nombre'],
                        "sabiduria" => $u->atributos_asignados[0]['valor'],
                        "nobleza" => $u->atributos_asignados[1]['valor'],
                        "virtud" => $u->atributos_asignados[2]['valor'],
                        "maldad" => $u->atributos_asignados[3]['valor'],
                        "astucia" => $u->atributos_asignados[4]['valor'],
                        "diosAfin" => $diosAfin[0]['nombre'],
                        "destino" => $u->humanos['destino'],
                        "estado" => $u->humanos['estado']
                    ];
                }
            }
            $datos[] = $data;
        }
        return response()->json(["sucess" => true, "data" => $datos, "message" => "Enviada info"], 200);
    }

    public function crearUsuariosMasivos($num, Request $req)
    {
        $faker = \Faker\Factory::create();
        $usuariosCreados = [];
        try {
            for ($i = 0; $i < $num; $i++) {
                $usuario = new User();
                $usuario->nombre = $faker->name();
                $usuario->password = bcrypt("123456");
                $usuario->email = $faker->unique()->safeEmail();
                $usuario->idR = 1;
                $usuario->email_verified_at = Carbon::now()->toDateTimeString();
                $usuario->save();
                $this->generarAtributos($usuario->id);
                $this->crearHumano($usuario->id);
                $success['token']  = $usuario->createToken('register', ["humano"])->plainTextToken;
                $success['nombre'] =  $usuario->nombre;
                $usuariosCreados[$i] = $usuario;
            }
            $cant = count($usuariosCreados);
        } catch (\Exception $e) {
            return response()->json(["success" => false, "mensaje" => "No se han podido añadir los usuarios pedidos"], 202);
        }
        return response()->json(["success" => true, "mensaje" => "Se han creado " . $cant . " humanos correctamente"], 200);
    }
    public function crearHumano($idUser)
    {
        $afinidad_Id = $this->generarAfinidad($idUser);
        $input = [
            'idU' => $idUser,
            'destino' => 0,
            'estado' => 'vivo',
            'idD' => $afinidad_Id[1],
            'afinidad' => $afinidad_Id[0]
        ];
        Humano::create($input);
    }

    public function generarAfinidad($idUser)
    {
        $a = [];
        $u = [];
        $aux = [];
        $completado = false;
        $total = [];
        $dios = [];
        $dioses = User::with(['atributos_asignados'])->where('idR', 2)->orWhere('idR', 3)->get();

        foreach ($dioses as $d) {
            for ($i = 0; $i < count($d->atributos_asignados); $i++) {
                $a[] = $d->atributos_asignados[$i]['valor'];
            }
            $dios[] = ['atributos' => $a, 'id' => $d->id];
            $a = [];
        }

        $usu = User::with(['atributos_asignados'])->where('id', $idUser)->get();

        foreach ($usu as $d) {
            for ($i = 0; $i < count($d->atributos_asignados); $i++) {
                $a[] = $d->atributos_asignados[$i]['valor'];
            }
            $u[] = ['atributos' => $a, 'id' => $d->id];
            $a = [];
        }
        for ($i = 0; $i < count($dios); $i++) {
            $total[$i] = 0;
            for ($j = 0; $j < count($u[0]['atributos']); $j++) {
                $resta[$j] = abs($dios[$i]['atributos'][$j] - $u[0]['atributos'][$j]);
                $total[$i] = $total[$i] + $resta[$j];
            }
            $aux[$i] = ['id' => $dios[$i]['id'], 'afinidad' => $total[$i]];
        }
        $afinidad_id[0] = min($total);
        for ($i = 0; $i < $total && !$completado; $i++) {
            if ($afinidad_id[0] === $aux[$i]['afinidad']) {
                $afinidad_id[1] = $aux[$i]['id'];
                $completado = true;
            }
        }

        return $afinidad_id;
    }

    public function generarAtributos($idU)
    {
        for ($i = 0; $i < 5; $i++) {
            $input = [
                'idU' => $idU,
                'idA' => 1 + $i,
                'valor' => rand(1, 5)
            ];
            atributos_asignado::create($input);
        }
    }
}
