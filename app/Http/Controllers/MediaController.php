<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $media = Media::with('uploader')->latest()->get();

        return Inertia::render('Artikel/Media', [
            'media' => $media,
            'categories' => \App\Models\Category::all(),
        ]);
    }
}
