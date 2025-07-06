<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $media = Media::latest()->paginate(12);
        return Inertia::render('Artikel/Media', [
            'media' => $media
        ]);
    }

    public function show(Media $media)
    {
        return Inertia::render('Media/Show', [
            'media' => $media
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'type' => 'required|in:image,video,external',
            'media_path' => 'nullable|file|mimes:jpg,jpeg,png,mp4|max:20480',
            'media_url' => 'nullable|url',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('media_path')) {
            $data['media_path'] = $request->file('media_path')->store('media');
        }

        $data['uploaded_by'] = Auth::id();
        $data['published_at'] = now();

        Media::create($data);

        return redirect()->back()->with('success', 'Media berhasil ditambahkan.');
    }
}
