<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
     protected $fillable = [
        'nama',
        'slug',
    ];

    // Jika artikel dan tag saling berhubungan banyak ke banyal
    
    public function artikels()
    {
        return $this->belongsToMany(Artikel::class);
    }
}
