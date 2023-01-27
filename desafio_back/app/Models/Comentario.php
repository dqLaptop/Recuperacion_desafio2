<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    protected $table = 'comentarios';
    protected $fillable = [
        'id',
        'idU',
        'idR',
        'comentario',
        'asunto',
        'leido'
    ];
    public function usuarios()
    {
        return $this->belongsTo(User::class, 'idU', 'id');
    }
}
