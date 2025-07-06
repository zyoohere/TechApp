<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Media;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class HomeController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();

        $articlesLatest = Artikel::with(['user:id,name', 'category:id,nama'])
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->paginate(6); // Bisa diganti jumlah tampilnya
        $artikels = Artikel::with(['category', 'user'])
            ->where('status', 'published')
            ->latest()->paginate(6)->withQueryString();
        $featuredMedia = Media::where('is_featured', true)
            ->latest()
            ->take(5)
            ->get();
        $media = Media::with('uploader')
            ->latest()
            ->take(6)
            ->get();
        return Inertia::render('Home', [
            'articlesLatest' => $articlesLatest,
            'artikels' => $artikels,
            'categories' => $categories,
            'filters' => $request->all('search', 'trashed'),
            'user' => Auth::user(),
            'featuredMedia' => $featuredMedia,
            'media' => $media,
        ]);
    }
}
