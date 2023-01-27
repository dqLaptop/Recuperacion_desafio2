<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @author Isabel
 */
class Prueba extends Model
{
    protected $table = 'prueba';
    use HasFactory;
    protected $fillable = [
        'id',
        'descripcion',
        'tipo',
        'destino',
        'idD'
    ];
    public function eleccion()
    {
        return $this->hasMany(pruebaEleccion::class, 'idP', 'id');
    }
    public function puntual()
    {
        return $this->hasMany(pruebaPuntual::class, 'idP', 'id');
    }
    public function valoracion()
    {
        return $this->hasMany(pruebaValoracion::class, 'idP', 'id');
    }
    public function respuestaLibre()
    {
        return $this->hasMany(pruebaRespuestaLibre::class, 'idP', 'id');
    }
    public function respuesta()
    {
        return $this->hasMany(Respuesta::class, 'idP', 'id');
    }
}
