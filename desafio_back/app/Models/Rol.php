<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Manuel
 */
class Rol extends Model
{
    use HasFactory;

    protected $table = 'roles'; //Por defecto tomaría la tabla 'rols'.
    public $timestamps = true;
}
