<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'title',
        'caption',
        'type',
        'media_path',
        'media_url',
        'is_featured',
        'uploaded_by',
        'published_at',
        'metadata',
    ];



    /**
     * Relasi ke user yang mengupload media.
     */
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    protected $casts = [
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
        'metadata' => 'array',
    ];
}
