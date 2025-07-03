<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'artikel_id',
        'user_id',
        'content',
        'is_approved',
        'status',
    ];

    /**
     * Relasi ke artikel (satu komentar milik satu artikel)
     */
    public function artikel()
    {
        return $this->belongsTo(Artikel::class);
    }

    /**
     * Relasi ke user (satu komentar milik satu user)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
