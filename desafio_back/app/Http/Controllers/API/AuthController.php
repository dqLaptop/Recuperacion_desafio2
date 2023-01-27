<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rol;
use App\Models\Humano;
use Illuminate\Support\Facades\Mail;
use App\Models\atributos_asignado;
use Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Validator;



class AuthController extends Controller
{
    /**
     * @author Manuel
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $auth = Auth::user();
            $verificado = $auth->email_verified_at;
            if (!is_null($verificado)) {
                $rolUsuario = $auth->idR;
                switch ($rolUsuario) {
                    case 1:
                        $success['token'] = $auth->createToken('access_token', ["humano"])->plainTextToken;
                        break;
                    case 2:
                        $success['token'] = $auth->createToken('access_token', ["dios"])->plainTextToken;
                        break;
                    case 3:
                        $success['token'] = $auth->createToken('access_token', ["dios,hades"])->plainTextToken;
                        break;
                };
                $success['id_usuario'] = $auth->id;
                $success['nombre'] = $auth->nombre;
                $success['email'] = $auth->email;
                return response()->json(["success" => true, "data" => $success, "message" => "Logged in!"], 200);
            } else {
                return response()->json(["success" => false, "message" => "Correo no verificado"], 202);
            }
        } else {
            return response()->json(["success" => false, "message" => "Error usuario/contraseña"], 202);
        }
    }

    /**
     * @author Isabel
     */
    public function register(Request $req)
    {
        $messages = [
            'email' => 'El campo no se ajusta a un correo estándar',
            'same' => 'Los campos :password y :confirm_password deben coincidir.',
            'max' => 'El campo se excede del tamaño máximo :max',
            'min' => 'El campo debe tener como minimo de tamaño :min caracteres'
        ];

        $input = [
            'nombre' => $req->get('nombre'),
            'email' => $req->get('email'),
            'password' => $req->get('password'),
            'idR' => $req->get('idR'),
        ];

        $validator = Validator::make($input, [
            'nombre' => 'required|string|max:30',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|min:6',
            'idR' => 'required',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        try {

            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $idUser = $user->id;
            $this->crearAtributosAsignados($idUser);
            $this->enviarCorreo($req->get('email'), $req->get('nombre'), $user->id);
            if ($input['idR'] === 1) {
                $this->crearHumano($idUser);
                $success['token']  = $user->createToken('register', ["humano"])->plainTextToken;
                $success['nombre'] =  $user->nombre;
            } else {
                if ($input['idR'] === 2) {
                    $success['token']  = $user->createToken('register', ["dios"])->plainTextToken;
                    $success['nombre'] =  $user->nombre;
                } else {
                    if ($input['idR'] === 3) {
                        $success['token']  = $user->createToken('register', ["dios,hades"])->plainTextToken;
                        $success['nombre'] =  $user->nombre;
                    }
                }
            }
        } catch (Exception $e) {


            return response()->json(["success" => false, "message" => "Lo sentimos, pero no se te ha podido registrar, por favor vuelva a registrarse"], 202);
        }
        return response()->json(["success" => true, "data" => $success, "message" => "¡¡Felicidades!! Te has registrado correctamente"], 200);
    }

    /**
     * @author Isabel
     */
    public function enviarCorreo($correo, $nombre, $id)
    {
        $datos = [
            'nombreUsuario' => $nombre,
            'email' => $correo,
            'idUsu' => $id
        ];

        $email = $correo;
        $nombre = 'alumnoDaw';

        Mail::send('correo', $datos, function ($message) use ($email) {
            $message->to($email)->subject('Verificación de correo');
            $message->from('AuxiliarDAW2@gmail.com', 'Verificando correo de usuario registrado');
        });
        return response()->json(["enviado" => true, "mensaje" => "Enviado"], 200);
    }

    /**
     * @author Isabel
     */
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

    /**
     * @author Isabel
     */
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
    /**
     * @author Isabel
     */
    public function crearAtributosAsignados($idU)
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

    /**
     * @author Manuel
     */
    public function logout(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $cantidad = Auth::user()->tokens()->delete();
            $auth = Auth::user();
            $success['id_usuario'] = $auth->id;
            $success['nombre'] = $auth->nombre;
            return response()->json([
                "success" => $cantidad,
                "message" => "Tokens Revoked",
                "data" => $success
            ], 200);
        } else {
            return response()->json(["message" => "Unauthorised"], 204);
        }
    }
}
