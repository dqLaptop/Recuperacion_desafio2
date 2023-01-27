<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Isabel
 */
class Respuesta extends Model
{
    protected $table = 'respuesta';
    use HasFactory;
    protected $fillable = [
        'id',
        'idP',
        'idU',
        'valor',
        'realizada'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'idU', 'id');
    }
    public function eleccion()
    {
        return $this->belongsTo(pruebaEleccion::class, 'idP', 'id');
    }
    public function valoracion()
    {
        return $this->belongsTo(pruebaValoracion::class, 'idP', 'id');
    }
    public function respuestaLibre()
    {
        return $this->belongsTo(pruebaRespuestaLibre::class, 'idP', 'id');
    }
    public function puntual()
    {
        return $this->belongsTo(pruebaPuntual::class, 'idP', 'id');
    }
    public function prueba()
    {
        return $this->belongsTo(Prueba::class, 'idP', 'id');
    }
}
