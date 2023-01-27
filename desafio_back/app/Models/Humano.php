<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @author Isabel
 */
class Humano extends Model
{
    use HasFactory;

    protected $primaryKey = 'idU';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'idU',
        'destino',
        'estado',
        'idD',
        'afinidad'
    ];
    public function usuarios()
    {
        return $this->belongsTo(User::class, 'idU', 'id');
    }
}
