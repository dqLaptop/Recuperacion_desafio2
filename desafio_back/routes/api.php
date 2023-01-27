<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\pruebaController;
use App\Http\Controllers\pruebaEleccionController;
use App\Http\Controllers\pruebaPuntualController;
use App\Http\Controllers\pruebaRespuestaLibreController;
use App\Http\Controllers\pruebaValoracionController;
use App\Http\Controllers\API\RespuestaController;
use App\Http\Controllers\API\HumanoController;
use App\Http\Controllers\API\ComentarioController;
use App\Http\Controllers\API\AtributosAsignadosController;
use App\Http\Middleware\midDios;

Route::post('login', [AuthController::class, 'login']); //Manuel
Route::post('logout', [AuthController::class, 'logout']); //Manuel
Route::post('register', [AuthController::class, 'register']); //Isabel;
Route::get('modificar/{id}', [UserController::class, 'mofidificarVerificacion']); //Isabel;

//Middlewares y auth:sanctum ---> Manuel
// Route::group(['middleware' => ['cors']], function ()  --->>>Añadir el middleware de cors, si hubiera problemas de ese tipo
Route::controller(UserController::class)->middleware(['auth:sanctum'])->prefix('Usuario')->group(function () { //Manuel
    Route::get('listar', 'index');
    Route::get('listar/{nom}', 'listar');
    Route::get('listarXId/{id}', 'show');
    Route::put('modificar/{nom}', 'update');
    Route::delete('borrar/{nom}', 'destroy')->middleware(['midHades']);
    Route::get('info/{id}', 'darInfoUsuario');
    Route::get('crearHumanosMasivo/{num}', 'crearUsuariosMasivos');
    Route::get('obtenerInfo', 'obtenerUsuarios');
    Route::get('obtenerInfoVivos', 'obtenerVivos');
    Route::get('obtenerInfoTartaro', 'obtenerMuertos');
});
Route::controller(ComentarioController::class)->middleware('auth:sanctum')->prefix('Hermes')->group(function () {
    Route::get('obtenerComentario/{id}', 'obtenerComentario');
    Route::put('modificarNoLeido', 'modificarNoLeido');
    Route::get('todos/{id}', 'index');
    Route::post('obtenerComentarioUsuario', 'show');
    Route::get('leidos/{id}', 'indexLeidos');
    Route::get('noleidos/{id}', 'indexNoLeidos');
    Route::post('enviar', 'store');
    Route::post('enviarTodos', 'storeTodos');
    Route::delete('eliminar/{cod}', 'destroy');
});

Route::controller(pruebaController::class)->middleware(['auth:sanctum'])->prefix('Prueba')->group(function () { //Isabel
    Route::get('obtener', 'index');
    Route::get('obtener/{id}', 'show');
    Route::post('crear', 'store');
    Route::put('modificar/{cod}', 'update');
    Route::delete('borrar/{id}', 'destroy');
});
Route::controller(AtributosAsignadosController::class)->middleware(['auth:sanctum'])->prefix('Atributos')->group(function () {
    Route::put('modificar', 'modificarAtributos');
    Route::post('obtenerInfoAtributos', 'obtenerInfoAtributos');
});
Route::controller(RespuestaController::class)->middleware(['auth:sanctum'])->prefix('Asignacion')->group(function () {
    Route::post('asignarPrueba', 'asignarPrueba')->middleware(['midDios']);
    Route::post('asignarPruebaTodos', 'asignarTodos')->middleware(['midDios']);
    Route::post('getInfoPrueba', 'obtenerInfoPruebaRespuesta')->middleware(['midHumano']);
});
Route::controller(pruebaEleccionController::class)->middleware('auth:sanctum')->prefix('Eleccion')->group(function () { //Isabel
    Route::get('obtener/{id}', 'show');
    Route::post('obtenerNombre','obtenerNombreEleccion');
    Route::post('resolver', 'resolver')->middleware(['midHumano']); //La resuelve
});
Route::controller(pruebaPuntualController::class)->middleware('auth:sanctum')->prefix('Puntual')->group(function () { //Isabel
    Route::get('obtener/{id}', 'show');
    Route::get('resolver', 'resolver')->middleware(['midHumano']);
});
Route::controller(pruebaValoracionController::class)->middleware('auth:sanctum')->prefix('Valoracion')->group(function () { //Isabel
    Route::get('obtener/{id}', 'show');
    Route::get('resolver', 'resolver')->middleware(['midHumano']);
});
Route::controller(pruebaRespuestaLibreController::class)->middleware('auth:sanctum')->prefix('Rl')->group(function () { //Isabel
    Route::get('obtener/{id}', 'show');
    Route::get('resolver', 'resolver')->middleware(['midHumano']);
});

//Al final no se usan estas rutas. Sustituidas por las de UserController
//Ojo, le quito el auth sanctum middleware
Route::controller(HumanoController::class)->prefix('Humano')->group(function () { //Manuel
    Route::get('listar', 'index');
    Route::get('info/{id}', 'darInfoHumano'); //Sustituido por el de UserController
});
