<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Isabel
 */
class Atributo extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function atributos_asignados()
    {
        return $this->hasMany(atributos_asignado::class, 'idA', 'id');
    }
}
