<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Manuel
 */
class Parametro extends Model
{
    use HasFactory;

    //protected $table = 'parametros'; //Por defecto toma la tabla 'parametros', asi que ok.
    //protected $primaryKey = 'id_otracosa';  //Por defecto el campo clave es 'id', entero y autonumérico.
    //public $incrementing = false; //Esta sirve para indicarle que la clave no es autoincremental.
    //protected $keyType = 'string';   //Indicamos si la clave no fuera entera.
    //public $timestamps = true;   //Con esto Eloquent no maneja automáticamente created_at ni updated_at.
}
