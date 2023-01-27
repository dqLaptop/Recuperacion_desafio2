<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Isabel
 */
class atributos_asignado extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function users()
    {
        return $this->belongsTo(User::class, 'idU', 'id');
    }
    public function atributos()
    {
        return $this->belongsTo(Atributo::class, 'idA', 'id');
    }
    protected $fillable = [
        'idU',
        'idA',
        'valor',
    ];
}
