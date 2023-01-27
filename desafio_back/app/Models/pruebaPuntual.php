<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Isabel
 */
class pruebaPuntual extends Model
{
    protected $table = 'prueba_puntual';
    use HasFactory;

    protected $fillable = [
        'id',
        'idP',
        'idA',
        'dificultad'
    ];
    public function prueba()
    {
        return $this->belongsTo(Prueba::class, 'idP', 'id');
    }
}
