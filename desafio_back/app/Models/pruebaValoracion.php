<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Isabel
 */
class pruebaValoracion extends Model
{
    use HasFactory;
    protected $table = 'prueba_valoracion';
    protected $fillable = [
        'id',
        'idP',
        'idA'
    ];
    public function prueba()
    {
        return $this->belongsTo(Prueba::class, 'idP', 'id');
    }
}
