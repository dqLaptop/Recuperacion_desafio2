<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Isabel
 */
class pruebaEleccion extends Model
{
    protected $table = 'prueba_eleccion';
    use HasFactory;
    protected $fillable = [
        'id',
        'idP',
        'atributo',
        'valor_atributo',
    ];
    public function prueba()
    {
        return $this->belongsTo(Prueba::class, 'idP', 'id');
    }
}
