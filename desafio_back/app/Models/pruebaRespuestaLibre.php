<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Isabel
 */
class pruebaRespuestaLibre extends Model
{
    protected $table = 'prueba_respuesta_libre';
    use HasFactory;
    protected $fillable = [
        'id',
        'idP',
        'palabras_clave',
        'acierto'
    ];
    public function prueba()
    {
        return $this->belongsTo(Prueba::class, 'idP', 'id');
    }
}
